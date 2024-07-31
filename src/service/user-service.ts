import createHttpError from "http-errors";
import type { WhereOptions } from "sequelize";

import { model } from "@database/index";
import UserMapping from "@mapping/user-mapping";
import Bcrypt from "@pkg/bcrypt";
import JsonWebtoken from "@pkg/jwt";
import type { User } from "@type/user";

class UserService {
  static async login(payload: User.LoginReq): Promise<User.LoginRes> {
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
  static async register(payload: User.Attributes): Promise<void> {
    const user = await this.findOne({ username: payload.username });
    if (user) {
      throw createHttpError.Conflict(`${payload.username} sudah digunakan`);
    }
    await model.User.create(payload);
  }

  static async findOne(where: WhereOptions<User.Attributes>): Promise<User.Attributes | null> {
    const user = await model.User.findOne({ where });
    return user ? user.toJSON() : null;
  }

  static async profile(id: number): Promise<User.Profile | null> {
    const user = await model.User.findOne({
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

  static async update(payload: Partial<User.Attributes>, where: WhereOptions<User.Attributes>): Promise<void> {
    await model.User.update(payload, { where });
  }
  static async remove(where: WhereOptions<User.Attributes>): Promise<void> {
    await model.User.destroy({ where });
  }
}
export default UserService;
