import morgan from "morgan";

import logger from "@common/utils/logger";

// Custom stream untuk Morgan agar menggunakan Winston
const stream = {
  write: (message: string) => logger.info(message.trim()),
};

// Format default Morgan
const morganMiddleware = morgan("combined", { stream });

export default morganMiddleware;
