import ApiError from "../utils/ApiError.js";

/**
 * Higher-order middleware to validate incoming request data using Zod schema.
 * @param {import('zod').ZodSchema} schema 
 * @param {'body' | 'query' | 'params'} source 
 */
export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    try {
      const dataToValidate = req[source];
      const result = schema.safeParse(dataToValidate);

      if (!result.success) {
        const errorDetails = result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        throw new ApiError(400, "Validation Error", errorDetails);
      }

      // Replace with parsed/sanitized data (coercions, defaults, etc.)
      req[source] = result.data;
      next();
    } catch (err) {
      next(err);
    }
  };
};
