import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

import { PrismaConfig } from "@config/prisma";
import { errorHandler, methodNotAllowed } from "@middleware/error-middleware";
import { AuthRoutes } from "@module/auth/auth-route";

class App {
  private readonly app: express.Application;
  readonly message: string;

  constructor(port: number) {
    this.app = express();
    this.message = `[Server]: I am running mode ${process.env.NODE_ENV} at http://localhost:${port}`;
  }

  get instance(): express.Application {
    return this.app;
  }

  init(): void {
    this.app.use(cors({ origin: "*", credentials: true }));
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    this.registerRoute();
  }

  private registerRoute(): void {
    this.app.get("/", (_, res) => {
      res.send({ message: this.message });
    });

    const { prisma } = PrismaConfig.getConfig();

    AuthRoutes.init(this.app, prisma);

    this.app.use(methodNotAllowed);
    this.app.use(errorHandler);
  }
}

export default App;
