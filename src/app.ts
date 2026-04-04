import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { errorHandler, methodNotAllowed } from "@common/middlewares/error-middleware";
import morganMiddleware from "@common/middlewares/morgan-middleware";
import { AuthRoutes } from "@module/auth/auth-route";

import { swaggerSpec } from "./docs/swagger";

export class App {
  private static appInstance: App;
  private app: express.Application;
  private message: string;
  private messageDoc: string;

  // ✅ private constructor
  private constructor(port: number) {
    this.app = express();
    this.message = `[Server]: I am running mode ${process.env.NODE_ENV} at http://localhost:${port}`;
    this.messageDoc = `Swagger docs: http://localhost:${port}/docs`;
  }

  // ✅ explicit init
  static init(port: number): {
    instance: express.Application;
    message: string;
    messageDoc: string;
  } {
    if (!App.appInstance) {
      App.appInstance = new App(port);
      App.appInstance.configure();
    }

    return {
      instance: this.appInstance.app,
      message: App.appInstance.message,
      messageDoc: App.appInstance.messageDoc,
    };
  }

  // private setup middleware & routes
  private configure(): void {
    this.app.use(cors({ origin: "*", credentials: true }));
    this.app.use(morganMiddleware);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.app.get("/", (_, res) => {
      res.send({ message: this.message });
    });

    AuthRoutes(this.app);

    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    this.app.use(methodNotAllowed);
    this.app.use(errorHandler);
  }
}
