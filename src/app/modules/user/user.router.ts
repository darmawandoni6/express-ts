import type express from "express";

import JsonWebtoken from "@helpers/jwt";
import BaseRoutes from "@helpers/routes";

import UserController from "./user.controller";
import type UserService from "./user.service";

class UserRouter extends BaseRoutes {
  userController: UserController;

  constructor(app: express.Application, userService: UserService) {
    super(app);
    this.userController = new UserController(userService);
  }

  protected __init() {
    this.app.use("/api-v1", this.routerPublic);
    this.app.use("/api-v1", JsonWebtoken.verifyAccessToken, this.routerPrivate);
  }
  protected routes(): void {
    this.routerPublic.post("/login", (req, res, next) => this.userController.login(req, res, next));
    this.routerPublic.post("/register", (req, res, next) => this.userController.register(req, res, next));

    this.routerPrivate.get("/user", (req, res, next) => this.userController.profile(req, res, next));
    this.routerPrivate
      .route("/user/:id")
      .put((req, res, next) => this.userController.update(req, res, next))
      .delete((req, res, next) => this.userController.remove(req, res, next));
  }
}

export default UserRouter;
