import "dotenv/config";
import http from "http";

import logger from "@common/utils/logger";
import { PrismaConfig } from "@config/prisma";

import { App } from "./app";

const bootstrap = async () => {
  try {
    const PORT = Number(process.env.PORT || "3000");

    // ✅ tunggu Prisma connect dulu
    await PrismaConfig.init();

    // ✅ init App singleton
    const app = App.init(PORT);

    const server = http.createServer(app.instance);

    server.listen(PORT, () => {
      logger.info(app.message);
      logger.info(app.messageDoc);
    });

    return server;
  } catch (error) {
    logger.error("❌ Bootstrap failed:", error);
    process.exit(1); // stop app kalau gagal
  }
};

(async () => {
  const server = await bootstrap();

  // ✅ graceful shutdown
  const shutdown = async () => {
    await PrismaConfig.shutdown();
    server.close(() => {
      logger.info("🛑 Shutting down...");
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
})();
