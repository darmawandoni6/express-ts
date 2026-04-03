import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import type { HttpError } from "http-errors";
import createHttpError from "http-errors";

import { ResponsesAPI } from "@common/utils/response";
import { PrismaClientKnownRequestError } from "@prisma-generated/internal/prismaNamespace";

export const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
  if (req.url.includes("/docs")) {
    next();
    return;
  }
  next(createHttpError.MethodNotAllowed());
};

export const errorHandler: ErrorRequestHandler = (err: HttpError, req, res, next) => {
  const { errorAPI } = new ResponsesAPI();
  const code = err.statusCode || 500;

  let message = err.message;
  let meta: Record<string, unknown> | undefined;
  if (err instanceof PrismaClientKnownRequestError) {
    meta = err.meta;
    message = err.meta ? (err.meta?.message as string) : err.message;
  }

  errorAPI(res, { message, status: code, meta });

  next();
};
