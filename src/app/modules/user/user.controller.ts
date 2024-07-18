import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";

import ResponseAPI from "@helpers/response";

import type { Attributes } from "./user.model";
import type UserService from "./user.service";
import UserValidate from "./user.validate";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, error } = UserValidate.USER_LOGIN.validate(req.body);
      if (error) {
        throw createHttpError.BadRequest(error.message);
      }
      const login = await this.userService.login(value);

      res.cookie("token", login.token, { httpOnly: true, expires: login.expired });

      ResponseAPI.success(res, login);
    } catch (error) {
      next(error);
    }
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, error } = UserValidate.USER_REGISTER.validate(req.body);
      if (error) {
        throw createHttpError.BadRequest(error.message);
      }
      await this.userService.register(value);
      ResponseAPI.success(res);
    } catch (error) {
      next(error);
    }
  }
  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals;
      const user = await this.userService.profile(id);
      ResponseAPI.success(res, user);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      let payload: Partial<Attributes> = {};
      let validate = UserValidate.USER_UPDATE.validate(req.body);
      if (validate.error) {
        throw createHttpError.BadRequest(validate.error.message);
      }
      payload = validate.value;

      validate = UserValidate.USER_UPDATE_PARAMS.validate(req.params);
      if (validate.error) {
        throw createHttpError.BadRequest(validate.error.message);
      }
      const user = await this.userService.update(payload, { id: validate.value.id });
      ResponseAPI.success(res, user);
    } catch (error) {
      next(error);
    }
  }
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, error } = UserValidate.USER_REMOVE_PARAMS.validate(req.params);
      if (error) {
        throw createHttpError.BadRequest(error.message);
      }
      const user = await this.userService.remove({ id: value.id });
      ResponseAPI.success(res, user);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
