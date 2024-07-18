import Joi from "joi";

import type { User } from "@type/user";

class UserValidate {
  static USER_LOGIN = Joi.object<User>({
    username: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(2).max(255).required(),
  });
  static USER_REGISTER = Joi.object<User>({
    username: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(2).max(255).required(),
    roleId: Joi.number().min(1).required(),
  });
  static USER_UPDATE = Joi.object<User>({
    username: Joi.string().min(2).max(255),
    password: Joi.string().min(2).max(255),
    roleId: Joi.number().min(1),
  });
  static USER_UPDATE_PARAMS = Joi.object<User>({
    id: Joi.number().min(1).required(),
  });
  static USER_REMOVE_PARAMS = Joi.object<User>({
    id: Joi.number().min(1).required(),
  });
}

export default UserValidate;
