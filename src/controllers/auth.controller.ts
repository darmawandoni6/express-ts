import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";

import RoleModel from "@models/role";
import UserModel from "@models/user";

import bcrypt from "@utils/bcrypt";
import { ResponseBody } from "@utils/env.t";
import jwt from "@utils/jwt";

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const find = await UserModel.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (find) {
        next(createHttpError.Conflict("User has been registered"));
        return;
      }
      const payload = {
        ...req.body,
        password: bcrypt.encrypt(req.body.password),
      };
      await UserModel.create(payload);

      const response: ResponseBody = {
        status: 200,
        message: "Create user success.",
        data: null,
      };

      res.send(response);
    } catch (error: any) {
      next(createHttpError.BadRequest(error.message));
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const find = await UserModel.findOne({
        where: {
          username: req.body.username,
        },
        include: [
          {
            model: RoleModel,
            attributes: ["id", "name"],
          },
        ],
      });

      if (!find) {
        next(createHttpError.NotFound("Username/password not found."));
        return;
      }

      const match = bcrypt.compare(req.body.password, find.password);
      if (!match) {
        next(createHttpError.NotFound("Username/password not found."));
        return;
      }

      const token = jwt.signToken({
        id: find.id,
        username: find.username,
        role: find.role,
      });

      const response: ResponseBody = {
        status: 200,
        message: "login success.",
        data: {
          token,
        },
      };

      res.send(response);
    } catch (error: any) {
      next(createHttpError.BadRequest(error.message));
    }
  },
};
