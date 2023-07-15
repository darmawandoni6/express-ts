import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import bcrypt from "@utils/bcrypt";
import jwt from "@utils/jwt";

import { RequestBody, ResponseBody, UserAttributes } from "./interface";
import services from "./services";

class Controller {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object<RequestBody>({
        username: Joi.string().required(),
        password: Joi.string().required(),
        roleId: Joi.number().required(),
      });

      const { value } = await services.validation(req, schema);

      const user = await services.findOne({ username: value?.username });

      if (user.error) {
        throw createHttpError.BadRequest(user.error);
      }
      if (user.data) {
        throw createHttpError.Conflict();
      }

      if (!value) {
        throw createHttpError.BadRequest();
      }
      const payload: RequestBody = {
        password: bcrypt.encrypt(value.password),
        roleId: value.roleId,
        username: value.username,
      };

      await services.create(payload);

      const result: ResponseBody = {
        message: "success register",
        status: 200,
        data: null,
      };
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object<RequestBody>({
        username: Joi.string().required(),
        password: Joi.string().required(),
      });
      const { value } = await services.validation(req, schema);
      if (!value) throw createHttpError.BadRequest();

      const user = await services.findOne({ username: value.username });
      if (!user.data) {
        throw createHttpError.NotFound("user not found");
      }
      if (user.error) {
        throw createHttpError.BadRequest(user.error);
      }
      const payload: UserAttributes = user.data as UserAttributes;

      const match = bcrypt.compare(value.password, payload.password);
      if (!match) {
        throw createHttpError.NotFound("user not found");
      }

      payload.password = "";
      const token = jwt.signToken(payload);

      const expired = new Date(); // Now
      expired.setDate(expired.getDate() + parseInt(process.env.EXP_TOKEN as string, 10)); // Set now + 30 days as the new date

      res.cookie("token", token, { httpOnly: true, expires: expired });

      const result: ResponseBody = {
        message: "success login",
        status: 200,
        data: {
          token,
          expired,
        },
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async getByToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals;

      const user = await services.findOneProfile({ id });
      if (user.error) {
        throw createHttpError.BadRequest(user.error);
      }

      const result: ResponseBody = {
        message: "success get by token",
        status: 200,
        data: user.data,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals;

      const user = await services.findOneProfile({ id });
      if (user.error) {
        throw createHttpError.BadRequest(user.error);
      }
      if (!user.data) {
        res.clearCookie("token");
        throw createHttpError.Unauthorized();
      }

      const schema = Joi.object<RequestBody>({
        username: Joi.string().required(),
        password: Joi.string(),
        roleId: Joi.number(),
      });

      const { value } = await services.validation(req, schema);
      if (!value) {
        throw createHttpError.BadRequest();
      }

      const userGet: UserAttributes = user.data as UserAttributes;

      const payload: RequestBody = {
        ...value,
        password: value.password ? bcrypt.encrypt(value.password) : userGet.password,
      };
      await services.edit({ id, payload });

      const result: ResponseBody = {
        message: "success get by token",
        status: 200,
        data: null,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals;

      const user = await services.remove(id);
      if (user.error) {
        throw createHttpError.BadRequest(user.error);
      }

      res.clearCookie("token");

      const result: ResponseBody = {
        message: "success remove user",
        status: 200,
        data: null,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
