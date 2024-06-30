import controllers from "@controller/role";

import { Router } from "express";

const router = Router();

router.route("/role").post(controllers.create).get(controllers.findAll);
router.route("/role/:id").put(controllers.update).delete(controllers.remove);

export default { router };
