import createHttpError from "http-errors";
import type { WhereOptions } from "sequelize";

import Bcrypt from "@helpers/bcrypt";
import JsonWebtoken from "@helpers/jwt";
import type { HelperUser } from "@type/helper";
import type { LoginReq, LoginRes, Profile, User } from "@type/user";

import UserMapping from "./user.mapping";
import type { Attributes } from "./user.model";
import type UserRepository from "./user.repository";

class UserService {
  private helper: HelperUser;
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository, helper: HelperUser) {
    this.userRepository = userRepository;
    this.helper = helper;
  }

  async login(payload: LoginReq): Promise<LoginRes> {
    const user = await this.findOne({ username: payload.username });
    if (!user) {
      throw createHttpError.NotFound("username or password not found");
    }

    const match = Bcrypt.compare(payload.password, user.password);
    if (!match) {
      throw createHttpError.NotFound("username or password not found");
    }

    user.password = "";
    const token = JsonWebtoken.signToken(user);
    const expired = new Date(); // Now
    expired.setDate(expired.getDate() + parseInt(process.env.EXP_TOKEN as string, 10));

    return { token, expired };
  }
  async register(payload: Attributes): Promise<void> {
    const user = await this.findOne({ username: payload.username });
    if (user) {
      throw createHttpError.Conflict(`${payload.username} sudah digunakan`);
    }

    payload.password = Bcrypt.encrypt(payload.password);
    await this.userRepository.create(payload);
  }

  async findOne(where: WhereOptions<User>): Promise<User | null> {
    const user = await this.userRepository.findOne({ where });
    return user ? user.toJSON() : null;
  }

  async profile(id: number): Promise<Profile | null> {
    const { model } = this.helper;
    const user = await this.userRepository.findOne({
      where: { id },
      include: [
        {
          model: model.Role,
          attributes: ["id", "name", "status"],
        },
      ],
      attributes: { exclude: ["password"] },
    });

    return UserMapping.profile(user);
  }

  async update(payload: Partial<User>, where: WhereOptions<User>): Promise<void> {
    await this.userRepository.update(payload, where);
  }
  async remove(where: WhereOptions<User>): Promise<void> {
    await this.userRepository.destroy(where);
  }
}
export default UserService;
