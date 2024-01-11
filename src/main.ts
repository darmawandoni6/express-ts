import express, { type Application } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import createHttpError from "http-errors";
import logger from "morgan";

import roleRouter from "@modules/role/routes";
import userRouter from "@modules/user/routes";

import { errorHandler } from "./middleware/handlingError";

class App {
  app: Application;
  port: number;
  message: string;

  constructor() {
    env.config();

    this.app = express();
    this.port = parseInt(process.env.PORT as string, 10) || 8000;

    this.message = `[Server]: I am running mode ${process.env.ENV} at http://localhost:${this.port}`;

    this.plugins();
    this.routes();
  }

  private plugins(): void {
    this.app.use(
      cors({
        credentials: true,
        origin: true,
      }),
    );
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }
  private routes(): void {
    this.app.get("/", (req, res) => {
      res.send({ message: this.message });
    });

    this.app.use("/api-v1", roleRouter);
    this.app.use("/api-v1", userRouter);

    this.app.use((req, res, next) => {
      next(createHttpError.NotFound());
    });

    this.app.use(errorHandler);
  }
}

const { app, port, message } = new App();

app.listen(port, () => {
  console.log(message);
});
