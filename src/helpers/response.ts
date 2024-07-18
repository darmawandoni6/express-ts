import type { Response } from "express";
class ResponseAPI {
  static success<T = null>(res: Response, data?: T) {
    res.status(200).send({
      code: res.statusCode,
      message: "success",
      data,
    });
  }
  static error(res: Response, message: string, code: number) {
    res.status(code).send({
      code: res.statusCode,
      message,
      data: null,
    });
  }
}
export default ResponseAPI;
