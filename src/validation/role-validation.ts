import Joi from "joi";

import type { Role } from "@type/role";

class RoleValidation {
  static ROLE_CREATE = Joi.object<Role.Attributes>({
    name: Joi.string().min(2).max(50).required(),
  });
  static ROLE_UPDATE = Joi.object<Role.Attributes>({
    name: Joi.string().min(2).max(50),
    status: Joi.boolean(),
  });
  static ROLE_UPDATE_PARAMS = Joi.object<Role.Attributes>({
    id: Joi.number().required(),
  });
  static ROLE_REMOVE_PARAMS = Joi.object<Role.Attributes>({
    id: Joi.number().required(),
  });
}

export default RoleValidation;
