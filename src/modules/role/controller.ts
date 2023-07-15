import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";

import { ResponseBody } from "./interface";
import services from "./services";
import { validationBody } from "./validation";

class Controller {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { error, value } = validationBody(req);
      if (error) {
        throw createHttpError.BadRequest(error);
      }

      if (!value) {
        throw createHttpError.BadRequest();
      }

      const role = await services.findOne({ name: value.name });
      if (role.error) {
        throw createHttpError.BadRequest(role.error);
      }
      if (role.data) {
        throw createHttpError.Conflict();
      }

      await services.create(value);

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
      const role = await services.edit(req);
      if (role.error) {
        throw createHttpError.BadRequest(role.error);
      }

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
      const role = await services.remove(req);
      if (role.error) {
        throw createHttpError.BadRequest(role.error);
      }

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
      if (role.error) {
        throw createHttpError.BadRequest(role.error);
      }

      const data: ResponseBody = {
        message: "success findAll",
        status: 200,
        data: role.data,
      };
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
