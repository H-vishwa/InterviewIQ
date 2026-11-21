import { z } from "zod";

export const generateQuestionsSchema = z.object({
  role: z.string().trim().min(2, "Role must be at least 2 characters long"),
  experience: z.string().trim().min(1, "Experience is required"),
  mode: z.enum(["HR", "Technical"], {
    errorMap: () => ({ message: "Mode must be either 'HR' or 'Technical'" }),
  }),
  resumeText: z.string().optional().default(""),
  projects: z.array(z.string()).optional().default([]),
  skills: z.array(z.string()).optional().default([]),
});

export const submitAnswerSchema = z.object({
  interviewId: z.string().min(1, "Interview ID is required"),
  questionIndex: z.number().int().min(0, "Valid question index is required"),
  answer: z.string().optional().default(""),
  timeTaken: z.number().min(0, "Time taken must be a non-negative number").default(0),
});

export const finishInterviewSchema = z.object({
  interviewId: z.string().min(1, "Interview ID is required"),
});

// Zod schemas for AI Structured Output Validation
export const resumeStructuredSchema = z.object({
  role: z.string().default("Unknown Role"),
  experience: z.string().default("0"),
  projects: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
});

export const answerEvaluationSchema = z.object({
  confidence: z.number().min(0).max(10).default(0),
  communication: z.number().min(0).max(10).default(0),
  correctness: z.number().min(0).max(10).default(0),
  finalScore: z.number().min(0).max(10).default(0),
  feedback: z.string().default("Answer evaluated"),
});
