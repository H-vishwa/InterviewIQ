import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { validate } from "../middlewares/validate.js";
import { aiLimiter } from "../middlewares/rateLimiter.js";
import {
  generateQuestionsSchema,
  submitAnswerSchema,
  finishInterviewSchema,
} from "../validations/interviewValidation.js";
import {
  analyzeInterview,
  finishInterview,
  generateQuestions,
  getInterviewReports,
  getMyInterviews,
  submitAnswer,
} from "../controllers/interviewController.js";

const interviewRouter = express.Router();

interviewRouter.post(
  "/resume",
  isAuth,
  aiLimiter,
  upload.single("resume"),
  analyzeInterview,
);

interviewRouter.post(
  "/generate-questions",
  isAuth,
  aiLimiter,
  validate(generateQuestionsSchema),
  generateQuestions,
);

interviewRouter.post(
  "/submit-answer",
  isAuth,
  aiLimiter,
  validate(submitAnswerSchema),
  submitAnswer,
);

interviewRouter.post(
  "/finish",
  isAuth,
  validate(finishInterviewSchema),
  finishInterview,
);

interviewRouter.get("/get-interview", isAuth, getMyInterviews);
interviewRouter.get("/report/:id", isAuth, getInterviewReports);

export default interviewRouter;
