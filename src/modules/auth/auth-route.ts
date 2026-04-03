import express from "express";

import { RequestValidation } from "@common/middlewares/request-validation";

import { AuthController } from "./auth-controller";
import { LoginSchema } from "./dto/login-schema";
import { RegisterSchema } from "./dto/register-schema";

export class AuthRoutes {
  private readonly ctr: AuthController;

  constructor() {
    this.ctr = new AuthController();
  }

  get router() {
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
    route.post("/register", RequestValidation.validate(RegisterSchema), this.ctr.register);
    route.post("/login", RequestValidation.validate(LoginSchema), this.ctr.login);

    return route;
  }

  static init(app: express.Application) {
    const auth = new AuthRoutes();
    app.use("/api", auth.router);
  }
}
