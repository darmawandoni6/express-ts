import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export default {
  signToken: (data: object): string => {
    const { ACCESS_TOKEN, EXP_TOKEN } = process.env;

    const token = jwt.sign(data, ACCESS_TOKEN, {
      expiresIn: `${EXP_TOKEN}d`,
    });
    return token;
  },
  verifyAccessToken: (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      next(createHttpError.Unauthorized());
      return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (error: unknown, payload: unknown) => {
      if (error) {
        const err = error as Error;
        const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        next(createHttpError.Unauthorized(message));
        return;
      }

      res.locals = payload as typeof res.locals;
      next();
    });
  },
};
