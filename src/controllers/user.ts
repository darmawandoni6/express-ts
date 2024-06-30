import type { User } from "@usecase/user/user.type";
import Usecases from "@usecase/user/user.usecase";
import type { NextFunction, Request, Response } from "express";
import type { ResJSON } from "src/type";

const uc = new Usecases();

const controllers = {
  register: async (req: Request, res: Response<ResJSON>, next: NextFunction): Promise<void> => {
    try {
      uc.attributes = req.body;
      await uc.register();
      res.send({
        status: 200,
        data: null,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response<ResJSON<unknown>>, next: NextFunction): Promise<void> => {
    try {
      uc.attributes = req.body;
      const access = await uc.login();
      res.send({
        status: 200,
        data: access,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
  getByToken: async (req: Request, res: Response<ResJSON<User>>, next: NextFunction): Promise<void> => {
    try {
      const { id } = res.locals;

      const data = await uc.getByToken(id);

      res.send({
        status: 200,
        data,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response<ResJSON>, next: NextFunction): Promise<void> => {
    try {
      const { id } = res.locals;

      uc.attributes = req.body;
      await uc.update(id);

      res.send({
        status: 200,
        data: null,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
  remove: async (req: Request, res: Response<ResJSON>, next: NextFunction): Promise<void> => {
    try {
      const { id } = res.locals;
      await uc.remove(id);

      res.send({
        status: 200,
        data: null,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controllers;
