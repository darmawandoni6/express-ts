import type { ErrorRequestHandler } from "express";

import type { HttpError } from "http-errors";

import ResponseAPI from "@helpers/response";

export const errorHandler: ErrorRequestHandler = (err: HttpError, req, res, next) => {
  const code = err.status || 500;
  ResponseAPI.error(res, err.message, code);
  next();
};
