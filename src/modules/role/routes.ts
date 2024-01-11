import BaseRouter from "@utils/baseRouter";

import controller from "./controller";

class Routes extends BaseRouter {
  routes(): void {
    this.router.route("/role").post(controller.create).get(controller.findAll);
    this.router.route("/role/:id").put(controller.edit).delete(controller.remove);
  }
}

const roleRouter = new Routes().router;
export default roleRouter;
