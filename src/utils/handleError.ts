import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  const code = err.status || 500;

  res.status(code);
  res.send({
    status: err.status,
    message: err.message,
    data: null,
  });
};
