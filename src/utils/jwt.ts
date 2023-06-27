import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export default {
  signToken: (data: object): string => {
    const { ACCESS_TOKEN, EXP_TOKEN } = process.env;

    const token = jwt.sign(data, ACCESS_TOKEN as string, {
      expiresIn: `${EXP_TOKEN}d`,
    });
    return token;
  },
  verifyAccessToken: (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies) {
      next(createHttpError.Unauthorized());
      return;
    }

    const { token } = req.cookies;

    jwt.verify(token, process.env.ACCESS_TOKEN as string, async (err: any, payload: any) => {
      if (err) {
        const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        next(createHttpError.Unauthorized(message));
        return;
      }

      res.locals.payload = payload;
      next();
    });
  },
};
