import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../index.js";

describe("API Production Gateway Integration Tests", () => {
  beforeAll(() => {
    process.env.NODE_ENV = "test";
    process.env.JWT_SECRET = "test_jwt_secret_key";
  });

  it("GET /healthz should respond with service health status", async () => {
    const res = await request(app).get("/healthz");
    expect(res.status).toBeOneOf([200, 503]);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("database");
    expect(res.body).toHaveProperty("uptime");
  });

  it("GET /api/nonexistent-route should return structured 404 via global error handler", async () => {
    const res = await request(app).get("/api/nonexistent-route");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("Route not found");
  });

  it("POST /api/interview/generate-questions without auth token should return 401", async () => {
    const res = await request(app)
      .post("/api/interview/generate-questions")
      .send({ role: "Frontend Developer", experience: "2", mode: "Technical" });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("Authentication token is missing");
  });
});
