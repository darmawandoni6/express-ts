import createHttpError from "http-errors";
import { WhereOptions } from "sequelize";

import RoleModel from "@modules/role/model";

import { UserAttributes } from "./interface";
import UserModel from "./model";

class Service {
  async create(payload: UserAttributes) {
    try {
      await UserModel.create(payload);
    } catch (error) {
      const e = error as Error;
      return Promise.reject(createHttpError.BadRequest(e.message));
    }
  }
  async findOne(where: WhereOptions<UserAttributes>) {
    try {
      const res = await UserModel.findOne({
        where,
        include: {
          model: RoleModel,
        },
      });
      return res?.toJSON();
    } catch (error) {
      const e = error as Error;
      return Promise.reject(createHttpError.BadRequest(e.message));
    }
  }
  async update(id: number, data: UserAttributes) {
    try {
      await UserModel.update(data, { where: { id } });
    } catch (error) {
      const e = error as Error;
      return Promise.reject(createHttpError.BadRequest(e.message));
    }
  }
  async remove(id: number) {
    try {
      await UserModel.destroy({ where: { id } });
    } catch (error) {
      const e = error as Error;
      return Promise.reject(createHttpError.BadRequest(e.message));
    }
  }
}

export default new Service();
