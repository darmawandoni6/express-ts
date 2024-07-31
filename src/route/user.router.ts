import type express from "express";

import UserController from "@controller/user.controller";
import BaseRoutes from "@helper/routes";
import JsonWebtoken from "@pkg/jwt";

class UserRoute extends BaseRoutes {
  constructor(app: express.Application) {
    super(app);
  }
  protected init() {
    this.app.use("/api-v1", this.routerPublic);
    this.app.use("/api-v1", JsonWebtoken.verifyAccessToken, this.routerPrivate);
  }
  protected routes(): void {
    this.routerPublic.post("/login", UserController.login);
    this.routerPublic.post("/register", UserController.register);

    this.routerPrivate.get("/user", UserController.profile);
    this.routerPrivate.route("/user/:id").put(UserController.update).delete(UserController.remove);
  }
}

export default UserRoute;
