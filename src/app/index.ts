import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import createHttpError from "http-errors";
import logger from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import role from "./routes/role";
import user from "./routes/user";

const app = express();

const port = Number(process.env.PORT) || 4000;
const message = `[Server]: I am running mode ${process.env.NODE_ENV} at http://localhost:${port}`;

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

app.get("/", (req, res) => {
  res.send({ message });
});

// route
app.use("/api-v1", role.router);
app.use("/api-v1", user.router);

app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use(errorHandler);

export { app, port, message };
