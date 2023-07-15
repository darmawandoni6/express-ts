import { Request } from "express";

import { IError, IResult, RequestBody, TWhere } from "./interface";
import RoleModel from "./model";
import { validationBody } from "./validation";

class Service {
  async create(req: RequestBody): Promise<IError> {
    try {
      await RoleModel.create(req);
      return { error: undefined };
    } catch (error) {
      const e = error as Error;
      return { error: e.message };
    }
  }
  async edit(req: Request): Promise<IError> {
    try {
      const { id } = req.params;
      const { error, value } = validationBody(req);
      if (error) {
        throw error;
      }

      if (!value) {
        throw "Something wrong";
      }

      await RoleModel.update(value, { where: { id: parseInt(id as string, 10) } });
      return {
        error: undefined,
      };
    } catch (error) {
      const e = error as Error;
      return { error: e.message };
    }
  }
  async remove(req: Request): Promise<IError> {
    try {
      const { id } = req.params;
      await RoleModel.destroy({ where: { id: parseInt(id as string, 10) } });
      return {
        error: undefined,
      };
    } catch (error) {
      const e = error as Error;
      return { error: e.message };
    }
  }
  async findAll(): Promise<IResult> {
    try {
      const res = await RoleModel.findAll();

      return {
        data: res ? res.map((item) => item.toJSON()) : [],
      };
    } catch (error) {
      const e = error as Error;
      return {
        data: null,
        error: e.message,
      };
    }
  }
  async findOne(where: TWhere): Promise<IResult> {
    try {
      const res = await RoleModel.findOne({ where });

      return {
        data: res ? res.toJSON() : null,
      };
    } catch (error) {
      const e = error as Error;
      return {
        data: null,
        error: e.message,
      };
    }
  }
}

export default new Service();
