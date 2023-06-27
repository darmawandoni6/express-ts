import express, { Express } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import logger from "morgan";

env.config();

const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export default app;
