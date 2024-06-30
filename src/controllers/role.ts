import type { Role } from "@usecase/role/role.type";
import Usecases from "@usecase/role/role.usecase";
import type { NextFunction, Request, Response } from "express";
import type { ResJSON } from "src/type";

const uc = new Usecases();
const controllers = {
  create: async (req: Request, res: Response<ResJSON>, next: NextFunction): Promise<void> => {
    try {
      uc.attributes = req.body;
      await uc.create();

      res.send({
        status: 200,
        data: null,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response<ResJSON>, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
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
      const id = parseInt(req.params.id, 10);
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
  findAll: async (req: Request, res: Response<ResJSON<Role[]>>, next: NextFunction): Promise<void> => {
    try {
      const data = await uc.findAll();

      res.send({
        status: 200,
        data: data,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controllers;
