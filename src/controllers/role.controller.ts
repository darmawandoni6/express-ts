import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";

import RoleModel from "@models/role";

import { ResponseBody } from "@utils/env.t";

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const find = await RoleModel.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (find) {
        next(createHttpError.Conflict("Duplicate data."));
        return;
      }
      await RoleModel.create(req.body);

      const response: ResponseBody = {
        status: 200,
        message: "Create role success.",
        data: find,
      };

      res.send(response);
    } catch (error: any) {
      next(createHttpError.BadRequest(error.message));
    }
  },
};
