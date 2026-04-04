import type { NextFunction, Request, Response } from "express";

import { ResponsesAPI } from "@common/utils/response";

import { AuthService } from "./auth-service";
import type { LoginBody } from "./dto/login-schema";

export class AuthController {
  private service: AuthService;

  private constructor() {
    this.service = AuthService.getInstance();
  }

  static init() {
    return new AuthController();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = String(req.body.email);

      await this.service.authRegister(email);
      const payload = this.service.userPayload(req.body);

      await this.service.submitRegister(payload);

      ResponsesAPI.success(res, { message: "Success register" });
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

      const data = await this.service.authLogin(user);

      ResponsesAPI.success(res, { message: "Success login", data });
    } catch (error) {
      next(error);
    }
  };
}
