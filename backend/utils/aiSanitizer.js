/**
 * Sanitizes raw AI text to extract clean JSON string.
 * Strips markdown code blocks (e.g. ```json ... ```) and leading/trailing whitespace.
 */
export const cleanJsonString = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    return "";
  }
  let cleaned = rawText.trim();
  // Remove markdown code fences ```json or ```
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
  cleaned = cleaned.replace(/\s*```$/, "");
  return cleaned.trim();
};

/**
 * Safely parses JSON string with optional Zod schema validation.
 */
export const parseAndValidateJson = (rawText, schema = null) => {
  const cleaned = cleanJsonString(rawText);
  if (!cleaned) {
    throw new Error("Empty AI response text");
  }

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    // Attempt fallback heuristic if wrapped in surrounding commentary
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const extracted = cleaned.substring(firstBrace, lastBrace + 1);
      parsed = JSON.parse(extracted);
    } else {
      throw new Error(`Failed to parse AI JSON response: ${err.message}`);
    }
  }

  if (schema) {
    const result = schema.safeParse(parsed);
    if (!result.success) {
      const validationIssues = result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      throw new Error(`AI response failed schema validation: ${validationIssues}`);
    }
    return result.data;
  }

  return parsed;
};
