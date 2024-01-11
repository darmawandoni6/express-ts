import { type Request } from "express";

import Joi from "joi";

export const validationBody = <T>(req: Request, schema: Joi.ObjectSchema<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    const request = schema.options({
      abortEarly: false,
    });

    const { value, error } = request.validate(req.body);
    if (error?.details) {
      reject(error.message);
    }
    resolve(value as T);
  });
};
