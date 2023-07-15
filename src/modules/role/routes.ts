import { Router } from "express";

import controller from "./controller";

class Routes {
  router: Router = Router();

  constructor() {
    this.routes();
  }
  routes(): void {
    this.router.route("/role").post(controller.create).get(controller.findAll);
    this.router.route("/role/:id").put(controller.edit).delete(controller.remove);
  }
}

const roleRouter = new Routes().router;
export default roleRouter;
