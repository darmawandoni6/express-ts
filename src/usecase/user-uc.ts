import type { Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import type { User } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import type { UserRepository } from "@repository/user-repo";
import { UsecaseBase } from "@util/base-usecase";
import { compare, encrypt } from "@util/bcrypt";
import { generateToken } from "@util/token";

export class UserUsecase extends UsecaseBase {
  private readonly userRepo: UserRepository;
  private body_register!: Prisma.UserCreateInput;

  constructor(user: UserRepository) {
    super();
    this.userRepo = user;
  }

  private schema = {
    register: Joi.object<User>({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    login: Joi.object<User>({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  };

  set setRegister(body: User) {
    const payload = this.validate(this.schema.register, body);
    this.body_register = {
      email: body.email,
      password: encrypt(payload.password),
    };
  }

  async register(): Promise<ReturnType<typeof this.result>> {
    const { email } = this.body_register;
    const isRegistered = await this.userRepo.isEmailRegistered(email);
    if (isRegistered) {
      throw createHttpError.Conflict(`${email} telah terdaftar`);
    }

    await this.userRepo.create(this.body_register);
    return this.result();
  }

  async login(body: User, res: Response): Promise<ReturnType<typeof this.result>> {
    const { email, password } = this.validate(this.schema.register, body);

    const user = await this.userRepo.getUser(email);
    if (!user) {
      throw createHttpError.NotFound(`${email} belum terdaftar`);
    }

    const match = compare(password, user.password);
    if (!match) {
      throw createHttpError.NotFound(`${email} belum terdaftar`);
    }

    const token = generateToken({
      email: user.email,
    });

    const expired = new Date(); // Now
    expired.setDate(expired.getDate() + parseInt(process.env.EXP_TOKEN as string, 10));

    res.cookie("token", token, {
      httpOnly: true,
      expires: expired,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return this.result({ token, expired });
  }
}
