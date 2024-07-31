import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

import { errorHandler, methodNotAllowed } from "@middleware/error-middleware";
import RoleRoute from "@route/role.route";
import UserRoute from "@route/user.router";

class App {
  private app: express.Application;
  readonly message: string;

  constructor(port: number) {
    this.app = express();
    this.message = `[Server]: I am running mode ${process.env.NODE_ENV} at http://localhost:${port}`;
  }

  init() {
    this.app.use(cors({ credentials: true, origin: "*" }));
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    this.registerRoute();
  }

  get instance(): express.Application {
    return this.app;
  }

  private registerRoute() {
    this.app.get("/", (req, res) => {
      res.send({ message: this.message });
    });

    new RoleRoute(this.app);
    new UserRoute(this.app);

    this.app.use(methodNotAllowed);
    this.app.use(errorHandler);
  }
}

export default App;
