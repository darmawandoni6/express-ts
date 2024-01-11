import BaseRouter from "@utils/baseRouter";
import jwt from "@utils/jwt";

import controller from "./controller";

class Routes extends BaseRouter {
  routes(): void {
    this.router.post("/register", controller.register);
    this.router.post("/login", controller.login);
    this.router
      .route("/user")
      .get(jwt.verifyAccessToken, controller.getByToken)
      .put(jwt.verifyAccessToken, controller.edit)
      .delete(jwt.verifyAccessToken, controller.remove);
  }
}

const userRouter = new Routes().router;

export default userRouter;
