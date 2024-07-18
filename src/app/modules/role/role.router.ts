import type express from "express";

import JsonWebtoken from "@helpers/jwt";
import BaseRoutes from "@helpers/routes";

import RoleController from "./role.controller";
import type RoleService from "./role.service";

class RoleRouter extends BaseRoutes {
  private roleController: RoleController;

  constructor(app: express.Application, roleService: RoleService) {
    super(app);
    this.roleController = new RoleController(roleService);
  }

  protected __init() {
    this.app.use("/api-v1", JsonWebtoken.verifyAccessToken, this.routerPrivate);
  }

  protected routes(): void {
    this.routerPrivate
      .route("/role")
      .get((req, res, next) => this.roleController.findAll(req, res, next))
      .post((req, res, next) => this.roleController.create(req, res, next));
    this.routerPrivate
      .route("/role/:id")
      .put((req, res, next) => this.roleController.update(req, res, next))
      .delete((req, res, next) => this.roleController.remove(req, res, next));
  }
}

export default RoleRouter;
