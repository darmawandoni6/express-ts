import createHttpError from "http-errors";
import type Joi from "joi";

import { resJson } from "./resJson";

export abstract class UsecaseBase {
  protected result<T>(data?: T) {
    return resJson(200, data);
  }

  protected validate<T>(schema: Joi.Schema, payload: T): T {
    const { error, value } = schema.validate(payload);

    if (error) {
      throw new createHttpError.BadRequest(error.message);
    }

    return value;
  }
}
