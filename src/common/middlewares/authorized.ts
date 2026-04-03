import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import type { VerifyErrors } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const authorized = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      next(createHttpError.Unauthorized());
      return;
    }

    jwt.verify(token, String(process.env.ACCESS_TOKEN), (error: VerifyErrors | null, payload: unknown) => {
      if (error) {
        const message = error.name === "JsonWebTokenError" ? "Unauthorized" : error.message;
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
