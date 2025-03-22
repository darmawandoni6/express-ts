import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";

import { errorHandler, methodNotAllowed } from "@middleware/error-middleware";
import type { PrismaClient } from "@prisma/client";
import { AuthRoute } from "@route/auth-route";

import { docsSwagger } from "./docs";

class App {
  private readonly app: express.Application;
  private readonly prisma: PrismaClient;
  readonly message: string;

  constructor(port: number, prisma: PrismaClient) {
    this.app = express();
    this.message = `[Server]: I am running mode ${process.env.NODE_ENV} at http://localhost:${port}`;
    this.prisma = prisma;
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

    const auth = new AuthRoute(this.prisma);
    this.app.use("/api-v1", auth.router);

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docsSwagger));

    this.app.use(methodNotAllowed);
    this.app.use(errorHandler);
  }
}

export default App;
