import type { NextFunction, Request, Response } from "express";

import { ResponsesAPI } from "@common/utils/response";

import { AuthService } from "./auth-service";
import type { LoginBody } from "./dto/login-schema";

export class AuthController extends ResponsesAPI {
  private service: AuthService;

  constructor() {
    super();
    this.service = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = String(req.body.email);

      await this.service.authRegister(email);
      const payload = this.service.userPayload(req.body);

      await this.service.submitRegister(payload);

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

      const data = await this.service.authLogin(user);

      this.successAPI(res, { message: "Success login", data });
    } catch (error) {
      next(error);
    }
  };
}
