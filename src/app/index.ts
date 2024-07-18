import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import createHttpError from "http-errors";
import logger from "morgan";
import type Service from "src/service";

import { errorHandler } from "@middleware/errorHandler";
import RoleRouter from "@modules/role/role.router";
import UserRouter from "@modules/user/user.router";

class App {
  private _app: express.Application;
  readonly message: string;

  constructor(port: number) {
    this._app = express();
    this.message = `[Server]: I am running mode ${process.env.NODE_ENV} at http://localhost:${port}`;
  }

  get instance(): express.Application {
    return this._app;
  }
  __init(service: Service) {
    this._app.use(cors({ credentials: true, origin: "*" }));
    this._app.use(logger("dev"));
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
    this._app.use(cookieParser());

    this.registerRoute(service);
  }

  private registerRoute(service: Service): void {
    this._app.get("/", (req, res) => {
      res.send({ message: this.message });
    });

    new UserRouter(this._app, service.userService);
    new RoleRouter(this._app, service.roleService);

    this._app.use((req, res, next) => {
      next(createHttpError.MethodNotAllowed());
    });

    this._app.use(errorHandler);
  }
}

export default App;
