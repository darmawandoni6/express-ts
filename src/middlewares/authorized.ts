import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const authorized = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      next(createHttpError.Unauthorized());
      return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN as string, (error: unknown, payload: unknown) => {
      if (error) {
        const err = error as Error;
        const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        next(createHttpError.Unauthorized(message));
        return;
      }

      res.locals = payload as typeof res.locals;
      next();
    });
  } catch (error) {
    next(error);
  }
};
