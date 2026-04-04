// logger.ts
import winston from "winston";

class Logger {
  private static instance: winston.Logger;

  private constructor() {}

  static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
        ),
        transports: [new winston.transports.Console(), new winston.transports.File({ filename: "logs/app.log" })],
      });
    }
    return Logger.instance;
  }
}

export default Logger.getInstance();
