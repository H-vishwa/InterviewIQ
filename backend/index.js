import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDb, { isDbConnected } from "./config/connectDb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import interviewRouter from "./routes/interviewRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import ApiError from "./utils/ApiError.js";

dotenv.config();

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

// Global Rate Limiting
app.use(generalLimiter);

// Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Health & Readiness Probes
app.get("/healthz", (req, res) => {
  const dbOk = isDbConnected();
  res.status(dbOk ? 200 : 503).json({
    status: dbOk ? "healthy" : "degraded",
    database: dbOk ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Application Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

// 404 Route Handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const port = process.env.PORT || 6000;

// Export app for integration testing
export { app };

// If executed directly, start DB and server
if (process.env.NODE_ENV !== "test") {
  try {
    await connectDb();
    const server = app.listen(port, () => {
      console.log(`🚀 IVQPrep Server ready and listening on port ${port}`);
    });

    const gracefulShutdown = () => {
      console.log("\nReceived kill signal, shutting down gracefully...");
      server.close(() => {
        console.log("Closed out remaining connections.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (err) {
    console.error("Failed to start server due to database connection error:", err);
    process.exit(1);
  }
}

