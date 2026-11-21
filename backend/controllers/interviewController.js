import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouterServices.js";
import User from "../models/userModel.js";
import Interview from "../models/interViewModel.js";
import ApiError from "../utils/ApiError.js";
import { parseAndValidateJson } from "../utils/aiSanitizer.js";
import {
  resumeStructuredSchema,
  answerEvaluationSchema,
} from "../validations/interviewValidation.js";

// Function is Created to Analyze the resume
export const analyzeInterview = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "Resume file is required");
    }

    const filePath = req.file.path;
    let resumeText = "";

    try {
      const fileBuffer = await fs.promises.readFile(filePath);
      const uint8Array = new Uint8Array(fileBuffer);

      const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        resumeText += pageText + "\n";
      }

      resumeText = resumeText.replace(/\s+/g, " ").trim();
    } finally {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    if (!resumeText) {
      throw new ApiError(400, "Could not extract text from the uploaded PDF resume");
    }

    const messages = [
      {
        role: "system",
        content: `Extract structured data from resume. Return ONLY JSON matching this format:
        {
          "role": "string",
          "experience": "string",
          "projects": ["project1", "project2"],
          "skills": ["skill1", "skill2"]
        }`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    const aiResponse = await askAi(messages);
    const parsed = parseAndValidateJson(aiResponse, resumeStructuredSchema);

    res.json({
      role: parsed.role,
      experience: parsed.experience,
      projects: parsed.projects,
      skills: parsed.skills,
      resumeText,
    });
  } catch (error) {
    next(error);
  }
};

// Function is Created to generateQuestions
export const generateQuestions = async (req, res, next) => {
  try {
    let { role, experience, mode, resumeText, projects, skills } = req.body;
    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    const user = await User.findById(req.userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.credits < 50) {
      throw new ApiError(400, "Not enough credits. Minimum 50 credits required");
    }

    const projectText =
      Array.isArray(projects) && projects.length ? projects.join(", ") : "None";

    const skillsText =
      Array.isArray(skills) && skills.length ? skills.join(", ") : "None";

    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
    Role:${role},
    Experience:${experience},
    InterviewMode:${mode},
    Projects:${projectText},
    Skills:${skillsText},
    Resume:${safeResume},
    `;

    const messages = [
      {
        role: "system",
        content: `
          You are a real human interviewer conducting a professional interview.

          Speak in simple, natural English as if you are directly talking to the candidate.

          Generate exactly 5 interview questions.

          Strict Rules:
          - Each question must contain between 15 and 25 words.
          - Each question must be a single complete sentence.
          - Do NOT number them.
          - Do NOT add explanations.
          - Do NOT add extra text before or after.
          - One question per line only.
          - Keep language simple and conversational.
          - Questions must feel practical and realistic.

          Difficulty progression:
          Question 1 → easy  
          Question 2 → medium  
          Question 3 → medium  
          Question 4 → hard  
          Question 5 → hard  

          Make questions based on the candidate’s role, experience,interviewMode, projects, skills, and resume details.
        `,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const airesponse = await askAi(messages);

    if (!airesponse || !airesponse.trim()) {
      throw new ApiError(500, "AI returned empty response");
    }

    const questionArray = airesponse
      .split("\n")
      .map((q) => q.replace(/^\d+[\.\)]\s*/, "").trim())
      .filter((q) => q.length > 0)
      .slice(0, 5);

    if (questionArray.length === 0) {
      throw new ApiError(500, "AI failed to generate questions");
    }

    user.credits -= 50;
    await user.save();

    const interview = await Interview.create({
      userId: user._id,
      role,
      experience,
      mode,
      resumeText: safeResume,
      questions: questionArray.map((q, index) => ({
        question: q,
        difficulty: ["easy", "medium", "medium", "hard", "hard"][index] || "medium",
        timeLimit: [60, 90, 90, 120, 120][index] || 90,
      })),
    });

    res.json({
      interviewId: interview._id,
      creditsLeft: user.credits,
      userName: user.name,
      questions: interview.questions,
    });
  } catch (error) {
    next(error);
  }
};

// Function is Created to submitAnswer
export const submitAnswer = async (req, res, next) => {
  try {
    const { interviewId, questionIndex, answer, timeTaken } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      throw new ApiError(404, "Interview not found");
    }

    const question = interview.questions[questionIndex];
    if (!question) {
      throw new ApiError(400, "Invalid question index");
    }

    if (!answer) {
      question.score = 0;
      question.feedback = "You did not submit the answer";
      question.answer = "";

      await interview.save();

      return res.json({ feedback: question.feedback });
    }

    if (timeTaken > question.timeLimit) {
      question.score = 0;
      question.feedback = "Time limit exceeded. Answer not evaluated";
      question.answer = answer;

      await interview.save();

      return res.json({ feedback: question.feedback });
    }

    const messages = [
      {
        role: "system",
        content: `
        You are a professional human interviewer evaluating a candidate's answer in a real interview.

        Evaluate naturally and fairly, like a real person would.

        Score the answer in these areas (0 to 10):

        1. Confidence – Does the answer sound clear, confident, and well-presented?
        2. Communication – Is the language simple, clear, and easy to understand?
        3. Correctness – Is the answer accurate, relevant, and complete?

        Rules:
        - Be realistic and unbiased.
        - Do not give random high scores.
        - If the answer is weak, score low.
        - If the answer is strong and detailed, score high.
        - Consider clarity, structure, and relevance.

        Calculate:
        finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

        Feedback Rules:
        - Write natural human feedback.
        - 10 to 15 words only.
        - Sound like real interview feedback.
        - Can suggest improvement if needed.
        - Do NOT repeat the question.
        - Do NOT explain scoring.
        - Keep tone professional and honest.

        Return ONLY valid JSON in this format:

        {
          "confidence": number,
          "communication": number,
          "correctness": number,
          "finalScore": number,
          "feedback": "short human feedback"
        }
        `,
      },
      {
        role: "user",
        content: `
        Question: ${question.question}
        Answer: ${answer}
        `,
      },
    ];

    const aiResponse = await askAi(messages);
    const parsed = parseAndValidateJson(aiResponse, answerEvaluationSchema);

    question.answer = answer;
    question.confidence = parsed.confidence;
    question.communication = parsed.communication;
    question.correctness = parsed.correctness;
    question.score = parsed.finalScore;
    question.feedback = parsed.feedback;
    await interview.save();

    return res.status(200).json({ feedback: parsed.feedback });
  } catch (error) {
    next(error);
  }
};

// Function is Created to finishInterview
export const finishInterview = async (req, res, next) => {
  try {
    const { interviewId } = req.body;
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      throw new ApiError(404, "Interview not found");
    }

    const totalQuestions = interview.questions.length;

    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;
    let totalScore = 0;

    interview.questions.forEach((q) => {
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
      totalScore += q.score || 0;
    });

    const finalScore = totalQuestions ? totalScore / totalQuestions : 0;
    const avgConfidence = totalQuestions ? totalConfidence / totalQuestions : 0;
    const avgCommunication = totalQuestions
      ? totalCommunication / totalQuestions
      : 0;
    const avgCorrectness = totalQuestions
      ? totalCorrectness / totalQuestions
      : 0;

    interview.finalScore = Number(finalScore.toFixed(1));
    interview.status = "Completed";

    await interview.save();

    return res.status(200).json({
      finalScore: Number(finalScore.toFixed(1)),
      confidence: Number(avgConfidence.toFixed(1)),
      communication: Number(avgCommunication.toFixed(1)),
      correctness: Number(avgCorrectness.toFixed(1)),
      questionWiseScore: interview.questions.map((q) => ({
        question: q.question,
        score: q.score || 0,
        feedback: q.feedback || "",
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
      })),
    });
  } catch (error) {
    next(error);
  }
};

// Function is Created to get the finished interview for reports
export const getMyInterviews = async (req, res, next) => {
  try {
    const interviews = await Interview.find({ userId: req.userId })
      .sort({
        createdAt: -1,
      })
      .select("role experience mode finalScore status createdAt");

    return res.status(200).json(interviews);
  } catch (error) {
    next(error);
  }
};

// This function is created to get interview reports
export const getInterviewReports = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      throw new ApiError(404, "Interview not found");
    }

    const totalQuestions = interview.questions.length;

    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    const avgConfidence = totalQuestions ? totalConfidence / totalQuestions : 0;
    const avgCommunication = totalQuestions
      ? totalCommunication / totalQuestions
      : 0;
    const avgCorrectness = totalQuestions
      ? totalCorrectness / totalQuestions
      : 0;

    return res.status(200).json({
      finalScore: interview.finalScore,
      confidence: Number(avgConfidence.toFixed(1)),
      communication: Number(avgCommunication.toFixed(1)),
      correctness: Number(avgCorrectness.toFixed(1)),
      questionWiseScore: interview.questions,
    });
  } catch (error) {
    next(error);
  }
};
