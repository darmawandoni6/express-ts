import createHttpError from "http-errors";

import type { PrismaClient } from "@prisma-generated/client";
import type { User } from "@shared/dto/user-schema";
import { UserUsecase } from "@shared/usecase/user-usecase";
import { compare } from "@util/bcrypt";
import { generateToken } from "@util/token";

import { AuthService } from "./auth-service";
import type { LoginResponseType } from "./dto/login-schema";

export class AuthUsecase extends UserUsecase {
  private authService: AuthService;

  constructor(prisma: PrismaClient) {
    super();
    this.authService = new AuthService(prisma);
  }

  async authRegister(email: string): Promise<void> {
    const isRegistered = await this.authService.isEmailRegistered(email);
    if (isRegistered) {
      const message = `${email} has been registered`;
      throw createHttpError.Conflict(message);
    }
  }

  async authLogin(user: User): Promise<LoginResponseType> {
    const res = await this.authService.getUser(user.email);

    const message = "email/password is wrong";

    if (!res) {
      throw createHttpError.NotFound(message);
    }

    const match = compare(user.password, res.password);
    if (!match) {
      throw createHttpError.NotFound(message);
    }

    const token = generateToken({
      email: user.email,
    });

    const expiredAt = new Date(); // Now
    expiredAt.setDate(expiredAt.getDate() + parseInt(process.env.EXP_TOKEN as string, 10));

    return { token, expiredAt: expiredAt.toISOString() };
  }
}
