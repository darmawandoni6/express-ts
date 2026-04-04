import createHttpError from "http-errors";

import type { User } from "@common/shared/dto/user-schema";
import { UserService } from "@common/shared/service/user-service";
import { Bcrypt } from "@common/utils/bcrypt";
import { generateToken } from "@common/utils/token";
import type { UserCreateInput } from "@prisma-generated/models";

import { AuthRepository } from "./auth-repository";
import type { LoginResponseType } from "./dto/login-schema";

export class AuthService extends UserService {
  private static instance: AuthService;
  private authRepository: AuthRepository;

  private constructor() {
    super();
    this.authRepository = AuthRepository.getInstance();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async authRegister(email: string): Promise<void> {
    const isRegistered = await this.authRepository.isEmailRegistered(email);
    if (isRegistered) {
      const message = `${email} has been registered`;
      throw createHttpError.Conflict(message);
    }
  }

  async submitRegister(payload: UserCreateInput): Promise<void> {
    await this.authRepository.create(payload);
  }

  async authLogin(user: User): Promise<LoginResponseType> {
    const res = await this.authRepository.getUser(user.email);

    const message = "email/password is wrong";

    if (!res) {
      throw createHttpError.NotFound(message);
    }

    const match = Bcrypt.compare(user.password, res.password);
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
