import express from "express";

abstract class BaseRoutes {
  protected app: express.Application;
  protected routerPublic: express.Router;
  protected routerPrivate: express.Router;

  constructor(app: express.Application) {
    this.app = app;
    this.routerPublic = express.Router();
    this.routerPrivate = express.Router();

    this.routes();
    this.init();
  }

  protected abstract init(): void;
  protected abstract routes(): void;
}
export default BaseRoutes;
