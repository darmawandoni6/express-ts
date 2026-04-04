import type { NextFunction, Request, Response } from "express";

import type { ZodObject } from "zod";

/**
 * RequestValidation provides a class-based Zod validation middleware
 * for Express.
 */
export class RequestValidation {
  /**
   * Returns an Express middleware function that validates the request
   *using the provided Zod schema.
   *
   * @param schema ZodObject to validate request
   */
  static validate(schema: ZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        // Parse the request
        const parsed = schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        // Assign parsed data back to request
        req.body = parsed.body;
        req.params = parsed.params as typeof req.params;

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
