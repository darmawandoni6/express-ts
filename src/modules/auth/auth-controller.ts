import type { NextFunction, Request, Response } from "express";

import type { PrismaClient } from "@prisma-generated/client";
import { ResponsesAPI } from "@util/response";

import { AuthService } from "./auth-service";
import { AuthUsecase } from "./auth-usecase";
import type { LoginBody } from "./dto/login-schema";

export class AuthController extends ResponsesAPI {
  private service: AuthService;
  private usecase: AuthUsecase;

  constructor(prisma: PrismaClient) {
    super();
    this.service = new AuthService(prisma);
    this.usecase = new AuthUsecase(prisma);
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = String(req.body.email);

      await this.usecase.authRegister(email);
      const payload = this.usecase.userPayload(req.body);

      await this.service.create(payload);

      this.successAPI(res, { message: "Success register" });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: LoginBody = {
        email: req.body.email,
        password: req.body.password,
      };

      const data = await this.usecase.authLogin(user);

      this.successAPI(res, { message: "Success login", data });
    } catch (error) {
      next(error);
    }
  };
}
