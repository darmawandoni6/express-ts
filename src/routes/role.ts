import expres from "express";

import roleController from "@controllers/role.controller";

const roleRouter = expres.Router();

roleRouter.post("/role", roleController.create);

export default roleRouter;
