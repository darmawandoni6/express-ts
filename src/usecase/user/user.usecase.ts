import Repository from "@database/user/user.repository";
import type { WhereOptions } from "sequelize";
import type { Attributes } from "@database/user/user.model";
import createHttpError from "http-errors";
import bcrypt from "@helper/bcrypt";
import jwt from "@helper/jwt";

class Usecases {
  private repository = new Repository();
  where: WhereOptions<Attributes> = {};
  attributes: Partial<Attributes> = {};

  async register() {
    try {
      const att = this.attributes as Attributes;
      att.password = bcrypt.encrypt(att.password);
      await this.repository.create(att);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async login() {
    try {
      if (!this.attributes.username || !this.attributes.password) {
        throw createHttpError.BadRequest();
      }
      const { username, password } = this.attributes;
      const user = await this.repository.findOne({ username });
      if (!user) {
        throw createHttpError.NotFound(`username: ${username}`);
      }

      const match = bcrypt.compare(password, user.password);
      if (!match) {
        throw createHttpError.NotFound(`username: ${username}`);
      }

      user.password = "";
      const token = jwt.signToken(user);

      const expired = new Date(); // Now
      expired.setDate(expired.getDate() + parseInt(process.env.EXP_TOKEN as string, 10)); // Set now + 30 days as the new date

      return { token, expired };
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getByToken(id: number) {
    try {
      const user = await this.repository.findOne({ id });
      if (!user) {
        throw createHttpError.NotFound();
      }

      user.password = "";
      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async update(id: number) {
    try {
      await this.repository.update(this.attributes, { id });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async remove(id: number) {
    try {
      await this.repository.remove(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Usecases;
