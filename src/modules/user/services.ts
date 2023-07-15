import { Request } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import RoleModel from "@modules/role/model";

import { IError, IResult, IWhere, RequestBody, ResValidation, TEdit } from "./interface";
import UserModel from "./model";
import { validationBody } from "./validation";

class Service {
  validation(req: Request, schema: Joi.ObjectSchema<RequestBody>) {
    const { value, error } = validationBody(req, schema);
    return new Promise<ResValidation>((res, rej) => {
      if (error) {
        rej(createHttpError.BadRequest(error));
      }
      if (value) {
        res({ value });
      }
    });
  }
  async create(payload: RequestBody): Promise<IError> {
    try {
      await UserModel.create(payload);
      return {
        error: undefined,
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async findOne(where: IWhere): Promise<IResult> {
    try {
      const res = await UserModel.findOne({ where });
      return {
        data: res ? res.toJSON() : null,
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async findOneProfile(where: IWhere): Promise<IResult> {
    try {
      const res = await UserModel.findOne({
        where,
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: RoleModel,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      return {
        data: res ? res.toJSON() : null,
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async edit({ id, payload }: TEdit): Promise<IError> {
    try {
      await UserModel.update(payload, { where: { id } });
      return {
        error: undefined,
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
  async remove(id: number): Promise<IError> {
    try {
      await UserModel.destroy({ where: { id } });
      return {
        error: undefined,
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: e.message,
      };
    }
  }
}

export default new Service();
