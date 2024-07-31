import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";

import ResponseAPI from "@helper/response-api";
import UserService from "@service/user-service";
import type { User } from "@type/user";
import UserValidation from "@validation/user-validation";

class UserController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, error } = UserValidation.USER_LOGIN.validate(req.body);
      if (error) {
        throw createHttpError.BadRequest(error.message);
      }
      const login = await UserService.login(value);

      res.cookie("token", login.token, { httpOnly: true, expires: login.expired });

      ResponseAPI.success(res, login);
    } catch (error) {
      next(error);
    }
  }
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, error } = UserValidation.USER_REGISTER.validate(req.body);
      if (error) {
        throw createHttpError.BadRequest(error.message);
      }
      await UserService.register(value);
      ResponseAPI.success(res);
    } catch (error) {
      next(error);
    }
  }
  static async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals;
      const user = await UserService.profile(id);
      ResponseAPI.success(res, user);
    } catch (error) {
      next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      let payload: Partial<User.Attributes> = {};
      let validate = UserValidation.USER_UPDATE.validate(req.body);
      if (validate.error) {
        throw createHttpError.BadRequest(validate.error.message);
      }
      payload = validate.value;

      validate = UserValidation.USER_UPDATE_PARAMS.validate(req.params);
      if (validate.error) {
        throw createHttpError.BadRequest(validate.error.message);
      }
      const user = await UserService.update(payload, { id: validate.value.id });
      ResponseAPI.success(res, user);
    } catch (error) {
      next(error);
    }
  }
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, error } = UserValidation.USER_REMOVE_PARAMS.validate(req.params);
      if (error) {
        throw createHttpError.BadRequest(error.message);
      }
      const user = await UserService.remove({ id: value.id });
      ResponseAPI.success(res, user);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
