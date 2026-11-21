import { cleanJsonString, parseAndValidateJson } from "../utils/aiSanitizer.js";
import ApiError from "../utils/ApiError.js";
import {
  generateQuestionsSchema,
  submitAnswerSchema,
  finishInterviewSchema,
  answerEvaluationSchema,
} from "../validations/interviewValidation.js";
import {
  createOrderSchema,
  verifyPaymentSchema,
} from "../validations/paymentValidation.js";

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✔ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✖ ${name}: ${err.message}`);
    process.exitCode = 1;
  }
}

function assert(cond, msg = "Assertion failed") {
  if (!cond) throw new Error(msg);
}

console.log("=== Running IVQPrep Production Test Suite ===\n");

console.log("[1. AI Sanitizer & Parser Unit Tests]");
runTest("cleanJsonString strips markdown fences", () => {
  const input = "```json\n{\"test\":1}\n```";
  assert(cleanJsonString(input) === '{"test":1}');
});

runTest("cleanJsonString handles empty input safely", () => {
  assert(cleanJsonString(null) === "");
  assert(cleanJsonString("") === "");
});

runTest("parseAndValidateJson parses clean JSON", () => {
  const result = parseAndValidateJson('{"confidence":8,"communication":9,"correctness":8,"finalScore":8,"feedback":"Great"}', answerEvaluationSchema);
  assert(result.finalScore === 8);
  assert(result.confidence === 8);
});

runTest("parseAndValidateJson extracts embedded JSON from conversational AI output", () => {
  const input = "Here is my evaluation:\n```json\n{\"confidence\":7,\"communication\":8,\"correctness\":9,\"finalScore\":8,\"feedback\":\"Good job\"}\n```\nHope that helps!";
  const result = parseAndValidateJson(input, answerEvaluationSchema);
  assert(result.correctness === 9);
});

runTest("parseAndValidateJson throws on invalid schema", () => {
  let threw = false;
  try {
    parseAndValidateJson('{"confidence": "not-number"}', answerEvaluationSchema);
  } catch {
    threw = true;
  }
  assert(threw, "Expected error on invalid schema");
});

console.log("\n[2. Request Validation Schemas]");
runTest("generateQuestionsSchema accepts valid payload", () => {
  const valid = {
    role: "Full Stack Developer",
    experience: "3 years",
    mode: "Technical",
    projects: ["IVQPrep"],
    skills: ["React", "Node.js"],
  };
  const parsed = generateQuestionsSchema.parse(valid);
  assert(parsed.role === "Full Stack Developer");
  assert(parsed.mode === "Technical");
});

runTest("generateQuestionsSchema rejects invalid mode", () => {
  const invalid = {
    role: "Frontend Developer",
    experience: "2 years",
    mode: "Behavioral", // Only "HR" or "Technical" allowed
  };
  let threw = false;
  try {
    generateQuestionsSchema.parse(invalid);
  } catch {
    threw = true;
  }
  assert(threw, "Expected error for invalid mode");
});

runTest("submitAnswerSchema enforces required interviewId and questionIndex", () => {
  const valid = {
    interviewId: "int_12345",
    questionIndex: 0,
    answer: "React uses a virtual DOM for efficient reconciliation.",
    timeTaken: 45,
  };
  const parsed = submitAnswerSchema.parse(valid);
  assert(parsed.timeTaken === 45);

  let threw = false;
  try {
    submitAnswerSchema.parse({ interviewId: "", questionIndex: -1 });
  } catch {
    threw = true;
  }
  assert(threw, "Expected rejection for negative question index");
});

runTest("createOrderSchema enforces positive amount and credits", () => {
  const valid = { planId: "starter", amount: 199, credits: 50 };
  assert(createOrderSchema.parse(valid).amount === 199);

  let threw = false;
  try {
    createOrderSchema.parse({ planId: "starter", amount: -50, credits: 0 });
  } catch {
    threw = true;
  }
  assert(threw, "Expected rejection for non-positive amount and credits");
});

runTest("verifyPaymentSchema validates razorpay signature parameters", () => {
  const valid = {
    razorpay_order_id: "order_123",
    razorpay_payment_id: "pay_123",
    razorpay_signature: "sig_abc",
  };
  assert(verifyPaymentSchema.parse(valid).razorpay_signature === "sig_abc");
});

console.log("\n[3. Error Architecture & Operational Safety]");
runTest("ApiError captures status code, message, and operational flag", () => {
  const error = new ApiError(404, "Resource not found", [{ field: "id", message: "invalid" }]);
  assert(error.statusCode === 404);
  assert(error.message === "Resource not found");
  assert(error.isOperational === true);
  assert(error.errors.length === 1);
});

console.log(`\n===========================================`);
console.log(`Test Results: ${passed}/${total} passed (${((passed / total) * 100).toFixed(0)}%)`);
console.log(`===========================================\n`);

if (passed !== total) {
  process.exit(1);
}
