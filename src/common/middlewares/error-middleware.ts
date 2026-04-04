import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import type { HttpError } from "http-errors";
import createHttpError from "http-errors";
import { ZodError } from "zod";

import logger from "@common/utils/logger";
import { ResponsesAPI } from "@common/utils/response";
import { PrismaClientKnownRequestError } from "@prisma-generated/internal/prismaNamespace";

export const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
  if (req.url.includes("/docs")) {
    next();
    return;
  }
  next(createHttpError.MethodNotAllowed());
};

export const errorHandler: ErrorRequestHandler = (err: HttpError, req, res, _next) => {
  let code = err.statusCode || 500;

  let message = err.message;
  let meta: unknown;

  if (err instanceof PrismaClientKnownRequestError) {
    meta = err.meta;
    message = err.meta ? (err.meta?.message as string) : err.message;
  } else if (err instanceof ZodError) {
    const issues = err.issues.map((err) => ({
      field: err.path.join("."), // clean path for error message
      message: err.message,
    }));

    code = 400;
    meta = issues;
    message = issues[0] ? `${issues[0].field}: ${issues[0].message}` : "Validation error";
  }

  logger.error(`Error on ${req.method} ${req.url}: ${err.message}`);

  ResponsesAPI.error(res, { message, status: code, meta });
};
