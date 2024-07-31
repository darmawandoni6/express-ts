import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";

import ResponseAPI from "@helper/response-api";
import RoleService from "@service/role-service";
import type { Role } from "@type/role";
import RoleValidation from "@validation/role-validation";

class RoleController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { value, error } = RoleValidation.ROLE_CREATE.validate(req.body);
      if (error) {
        throw createHttpError.BadRequest(error.message);
      }
      const role = await RoleService.findOne({ name: value.name });
      if (role) {
        throw createHttpError.Conflict(`duplicate ${value.name}`);
      }
      await RoleService.create(value);
      ResponseAPI.success(res);
    } catch (error) {
      next(error);
    }
  }
  static async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await RoleService.findAll();
      ResponseAPI.success(res, data);
    } catch (error) {
      next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let payload: Partial<Role.Attributes> = {};
      let validate = RoleValidation.ROLE_UPDATE.validate(req.body);
      if (validate.error) {
        throw createHttpError.BadRequest(validate.error.message);
      }
      payload = validate.value;

      validate = RoleValidation.ROLE_UPDATE_PARAMS.validate(req.params);
      if (validate.error) {
        throw createHttpError.BadRequest(validate.error.message);
      }

      await RoleService.update(payload, { id: validate.value.id });
      ResponseAPI.success(res);
    } catch (error) {
      next(error);
    }
  }
  static async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { value, error } = RoleValidation.ROLE_REMOVE_PARAMS.validate(req.params);
      if (error) {
        throw createHttpError.BadRequest(error.message);
      }

      await RoleService.remove({ id: value.id });
      ResponseAPI.success(res);
    } catch (error) {
      next(error);
    }
  }
}

export default RoleController;
