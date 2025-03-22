import express from "express";

import { AuthController } from "@controller/auth-controller";
import type { PrismaClient } from "@prisma/client";

export class AuthRoute {
  private readonly ctr: AuthController;

  constructor(prisma: PrismaClient) {
    this.ctr = new AuthController(prisma);
  }

  get router() {
    const route = express.Router();
    route.post("/register", this.ctr.register);
    route.post("/login", this.ctr.login);

    return route;
  }
}
