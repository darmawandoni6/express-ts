import type express from "express";

import RoleController from "@controller/role.controller";
import BaseRoutes from "@helper/routes";
import JsonWebtoken from "@pkg/jwt";

class RoleRoute extends BaseRoutes {
  constructor(app: express.Application) {
    super(app);
  }

  protected init() {
    this.app.use("/api-v1", JsonWebtoken.verifyAccessToken, this.routerPrivate);
  }

  protected routes(): void {
    this.routerPrivate.route("/role").get(RoleController.findAll).post(RoleController.create);
    this.routerPrivate.route("/role/:id").put(RoleController.update).delete(RoleController.remove);
  }
}

export default RoleRoute;
