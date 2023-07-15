import { Request } from "express";

import Joi from "joi";

import { RequestBody, ResValidation } from "./interface";

export const validationBody = (req: Request, schema: Joi.ObjectSchema<RequestBody>): ResValidation => {
  const request = schema.options({
    abortEarly: false,
  });
  // const schema = Joi.object<RequestBody>({
  // username: Joi.string().required(),
  // password: Joi.string().required(),
  // roleId: Joi.number().required(),
  // }).options({
  //   abortEarly: false,
  // });

  const { value, error } = request.validate(req.body);
  if (error?.details) {
    return {
      error: error.message,
    };
  }
  return {
    value,
  };
};
