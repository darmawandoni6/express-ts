import { Router } from "express";

abstract class BaseRouter {
  router = Router();
  constructor() {
    this.routes();
  }
  abstract routes(): void;
}

export default BaseRouter;
