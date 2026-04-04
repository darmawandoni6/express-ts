import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import type { VerifyCallback } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const authorized = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw createHttpError.Unauthorized();
    }

    const callback: VerifyCallback = (error, decode) => {
      if (error) {
        const message = error.name === "JsonWebTokenError" ? "Unauthorized" : error.message;
        throw createHttpError.Unauthorized(message);
      }

      res.locals = decode as typeof res.locals;

      next();
    };

    jwt.verify(token, String(process.env.ACCESS_TOKEN), callback);
  } catch (error) {
    next(error);
  }
};
