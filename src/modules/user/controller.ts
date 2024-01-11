import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import bcrypt from "@utils/bcrypt";
import { validationBody } from "@utils/joi";
import jwt from "@utils/jwt";
import type { ResponseBody } from "@utils/type";

import type { IController, UserAttributes } from "./interface";
import services from "./services";

class Controller implements IController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object<UserAttributes>({
        username: Joi.string().required(),
        password: Joi.string().required(),
        roleId: Joi.number().required(),
      });

      const body = await validationBody<UserAttributes>(req, schema);

      body.password = bcrypt.encrypt(body.password);

      await services.create(body);

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
      const schema = Joi.object<UserAttributes>({
        username: Joi.string().required(),
        password: Joi.string().required(),
      });
      const body = await validationBody<UserAttributes>(req, schema);

      const user = await services.findOne({ username: body.username });
      if (!user) {
        throw createHttpError.NotFound(`${body.username} not found`);
      }

      const match = bcrypt.compare(body.password, user.password);
      if (!match) {
        throw createHttpError.NotFound(`${body.username} not found`);
      }

      user.password = "";
      const token = jwt.signToken(user);

      const expired = new Date(); // Now
      expired.setDate(expired.getDate() + parseInt(process.env.EXP_TOKEN as string, 10)); // Set now + 30 days as the new date

      res.cookie("token", token, { httpOnly: true, expires: expired });

      const login = {
        token,
        expired,
      };
      const result: ResponseBody<typeof login> = {
        message: "success login",
        status: 200,
        data: login,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async getByToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals;

      const user = await services.findOne({ id });
      if (!user) {
        throw createHttpError.NotFound();
      }
      user.password = "";
      const result: ResponseBody<UserAttributes> = {
        message: "success get by token",
        status: 200,
        data: user,
      };

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals;

      const schema = Joi.object<UserAttributes>({
        username: Joi.string().required(),
        password: Joi.string(),
        roleId: Joi.number(),
      });

      const body = await validationBody<UserAttributes>(req, schema);

      await services.update(id, body);

      const result: ResponseBody = {
        message: "success edit",
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

      await services.remove(id);

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
