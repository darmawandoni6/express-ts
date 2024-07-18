import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";

import ResponseAPI from "@helpers/response";
import type { Role } from "@type/role";

import type RoleService from "./role.service";
import RoleValidate from "./role.validate";

class RoleController {
  private roleService: RoleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { value, error } = RoleValidate.ROLE_CREATE.validate(req.body);
      if (error) {
        throw createHttpError.BadRequest(error.message);
      }
      const role = await this.roleService.findOne({ name: value.name });
      if (role) {
        throw createHttpError.Conflict(`duplicate ${value.name}`);
      }
      await this.roleService.create(value);
      ResponseAPI.success(res);
    } catch (error) {
      next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.roleService.findAll();
      ResponseAPI.success(res, data);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let payload: Partial<Role> = {};
      let validate = RoleValidate.ROLE_UPDATE.validate(req.body);
      if (validate.error) {
        throw createHttpError.BadRequest(validate.error.message);
      }
      payload = validate.value;

      validate = RoleValidate.ROLE_UPDATE_PARAMS.validate(req.params);
      if (validate.error) {
        throw createHttpError.BadRequest(validate.error.message);
      }

      await this.roleService.update(payload, { id: validate.value.id });
      ResponseAPI.success(res);
    } catch (error) {
      next(error);
    }
  }
  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { value, error } = RoleValidate.ROLE_REMOVE_PARAMS.validate(req.params);
      if (error) {
        throw createHttpError.BadRequest(error.message);
      }

      await this.roleService.remove({ id: value.id });
      ResponseAPI.success(res);
    } catch (error) {
      next(error);
    }
  }
}

export default RoleController;
