import express from "express";

import { RequestValidation } from "@middleware/request-validation";
import type { PrismaClient } from "@prisma-generated/client";

import { AuthController } from "./auth-controller";
import { LoginSchema } from "./dto/login-schema";
import { RegisterSchema } from "./dto/register-schema";

export class AuthRoutes {
  private readonly ctr: AuthController;

  constructor(prisma: PrismaClient) {
    this.ctr = new AuthController(prisma);
  }

  get router() {
    const route = express.Router();
    route.post("/register", RequestValidation.validate(RegisterSchema), this.ctr.register);
    route.post("/login", RequestValidation.validate(LoginSchema), this.ctr.login);

    return route;
  }

  static init(app: express.Application, prisma: PrismaClient) {
    const auth = new AuthRoutes(prisma);
    app.use("/api", auth.router);
  }
}
