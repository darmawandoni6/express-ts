import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import type { HttpError } from "http-errors";
import createHttpError from "http-errors";

import ResponseAPI from "@helper/response-api";

type MethodNotAllowed = (req: Request, res: Response, next: NextFunction) => void;

export const methodNotAllowed: MethodNotAllowed = (req, res, next) => {
  next(createHttpError.MethodNotAllowed());
};
export const errorHandler: ErrorRequestHandler = (err: HttpError, req, res, next) => {
  const code = err.status || 500;
  ResponseAPI.error(res, err.message, code);
  next;
};
