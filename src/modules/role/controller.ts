import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import Joi from "joi";

import { validationBody } from "@utils/joi";
import type { ResponseBody } from "@utils/type";

import type { IController, RoleAtributes } from "./interface";
import services from "./services";

class Controller implements IController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const schema = Joi.object<RoleAtributes>({
        name: Joi.string().required(),
      });

      const body = await validationBody<RoleAtributes>(req, schema);

      const role = await services.findOne(body.name);
      if (role) {
        throw createHttpError.Conflict(`${role.name} sudah ada`);
      }

      await services.create(body);

      const data: ResponseBody = {
        message: "success create",
        status: 200,
        data: null,
      };
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      const schema = Joi.object<RoleAtributes>({
        name: Joi.string().required(),
      });
      const body = await validationBody<RoleAtributes>(req, schema);

      const role = await services.findOne(body.name);
      if (role) {
        throw createHttpError.Conflict(`${role.name} sudah ada`);
      }
      await services.update(id, body);

      const data: ResponseBody = {
        message: "success update",
        status: 200,
        data: null,
      };
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await services.remove(id);

      const data: ResponseBody = {
        message: "success remove",
        status: 200,
        data: null,
      };
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const role = await services.findAll();

      const data: ResponseBody<RoleAtributes[]> = {
        message: "success findAll",
        status: 200,
        data: role,
      };
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
