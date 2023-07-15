import { Request } from "express";

import Joi from "joi";

import { RequestBody, ResValidation } from "./interface";

export const validationBody = (req: Request): ResValidation => {
  const schema = Joi.object<RequestBody>({
    name: Joi.string().required(),
    status: Joi.boolean().required(),
  }).options({
    abortEarly: false,
  });

  const { value, error } = schema.validate(req.body);
  if (error?.details) {
    return {
      error: error.message,
    };
  }
  return {
    value,
  };
};
