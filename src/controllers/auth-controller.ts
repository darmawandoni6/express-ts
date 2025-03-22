import type { NextFunction, Request, Response } from "express";

import type { PrismaClient } from "@prisma/client";
import { UserRepository } from "@repository/user-repo";
import { UserUsecase } from "@usecase/user-uc";

export class AuthController {
  private readonly uc: UserUsecase;

  constructor(prisma: PrismaClient) {
    const repo = new UserRepository(prisma);
    this.uc = new UserUsecase(repo);
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.uc.setRegister = req.body;
      const result = await this.uc.register();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.uc.login(req.body, res);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
