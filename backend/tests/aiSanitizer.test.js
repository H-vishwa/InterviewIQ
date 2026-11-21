import { describe, it, expect } from "vitest";
import { cleanJsonString, parseAndValidateJson } from "../utils/aiSanitizer.js";
import { z } from "zod";

describe("AI Sanitizer & Parser Unit Tests", () => {
  it("should strip markdown json fences properly", () => {
    const rawMarkdown = "```json\n{\"role\":\"Software Engineer\",\"experience\":\"3\"}\n```";
    const cleaned = cleanJsonString(rawMarkdown);
    expect(cleaned).toBe('{"role":"Software Engineer","experience":"3"}');
  });

  it("should strip plain markdown fences properly", () => {
    const rawMarkdown = "```\n{\"role\":\"Frontend Dev\"}\n```";
    const cleaned = cleanJsonString(rawMarkdown);
    expect(cleaned).toBe('{"role":"Frontend Dev"}');
  });

  it("should parse and validate structured JSON successfully", () => {
    const schema = z.object({
      role: z.string(),
      score: z.number(),
    });
    const rawAiText = "```json\n{\"role\":\"Full Stack\",\"score\":8.5}\n```";
    const parsed = parseAndValidateJson(rawAiText, schema);

    expect(parsed.role).toBe("Full Stack");
    expect(parsed.score).toBe(8.5);
  });

  it("should extract embedded JSON if surrounded by commentary text", () => {
    const schema = z.object({
      confidence: z.number(),
    });
    const noisyText = "Here is the candidate evaluation:\n{\"confidence\": 9}\nHope this helps!";
    const parsed = parseAndValidateJson(noisyText, schema);

    expect(parsed.confidence).toBe(9);
  });

  it("should throw error if schema validation fails", () => {
    const schema = z.object({
      role: z.string(),
      score: z.number(),
    });
    const invalidData = '{"role": 123, "score": "not-a-number"}';

    expect(() => parseAndValidateJson(invalidData, schema)).toThrow(
      /AI response failed schema validation/,
    );
  });
});
