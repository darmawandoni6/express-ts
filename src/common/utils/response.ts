import type { Response } from "express";

export const ResponsesAPI = {
  success<T>(
    response: Response,
    opt: Pick<ApiResponse<T>, "message"> & {
      data?: T;
      status?: number;
    }
  ) {
    const status = opt.status ?? 200;

    const json: ApiResponse<T> = {
      success: true,
      data: opt.data ?? null,
      message: opt.message ?? "Success",
    };
    response.status(status).json(json);
  },

  error<T>(response: Response, opt: Pick<ApiResponse<T>, "message" | "meta"> & { status?: number }) {
    const status = opt.status ?? 400;

    const json: ApiResponse<T> = {
      success: false,
      data: null,
      message: opt.message ?? "Something Wrong",
    };

    if (process.env.NODE_ENV === "development") {
      json.meta = opt.meta;
    }

    response.status(status).json(json);
  },
};
