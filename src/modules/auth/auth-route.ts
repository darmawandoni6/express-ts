import express from "express";

import { RequestValidation } from "@common/middlewares/request-validation";

import { AuthController } from "./auth-controller";
import { LoginSchema } from "./dto/login-schema";
import { RegisterSchema } from "./dto/register-schema";

export const AuthRoutes = (app: express.Application) => {
  const controller = AuthController.init();

  const route = express.Router();
  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@email.com
   *               password:
   *                 type: string
   *                 example: password123
   *     responses:
   *       201:
   *         description: User registered successfully
   *       400:
   *         description: Validation error
   */
  route.post("/register", RequestValidation.validate(RegisterSchema), controller.register);
  route.post("/login", RequestValidation.validate(LoginSchema), controller.login);

  app.use("/api", route);
};
