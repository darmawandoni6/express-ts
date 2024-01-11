import createHttpError from "http-errors";

import { RoleAtributes } from "./interface";
import RoleModel from "./model";

class Service {
  async findOne(name: string) {
    try {
      const res = await RoleModel.findOne({ where: { name } });
      return res?.toJSON();
    } catch (error) {
      const err = error as Error;
      console.log(err.message);

      return Promise.reject(createHttpError.BadRequest(err.message));
    }
  }
  async create(data: RoleAtributes) {
    try {
      await RoleModel.create(data);
    } catch (error) {
      const err = error as Error;
      console.log(err.message);

      return Promise.reject(createHttpError.BadRequest(err.message));
    }
  }
  async update(id: number, data: RoleAtributes) {
    try {
      await RoleModel.update(data, { where: { id } });
    } catch (error) {
      const err = error as Error;
      return Promise.reject(createHttpError.BadRequest(err.message));
    }
  }
  async remove(id: number) {
    try {
      await RoleModel.update({ status: false }, { where: { id } });
    } catch (error) {
      const err = error as Error;
      return Promise.reject(createHttpError.BadRequest(err.message));
    }
  }
  async findAll() {
    try {
      const res = await RoleModel.findAll();
      return res;
    } catch (error) {
      const err = error as Error;
      return Promise.reject(createHttpError.BadRequest(err.message));
    }
  }
}

export default new Service();
