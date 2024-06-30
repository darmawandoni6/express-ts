import controllers from "@controller/user";
import jwt from "@helper/jwt";

import { Router } from "express";

const router = Router();

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router
  .route("/user")
  .get(jwt.verifyAccessToken, controllers.getByToken)
  .put(jwt.verifyAccessToken, controllers.remove)
  .delete(jwt.verifyAccessToken, controllers.remove);

export default { router };
