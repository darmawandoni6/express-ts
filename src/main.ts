import "dotenv/config";
import http from "http";

import { prisma } from "@config/prisma";

import App from "./app";

const main = async () => {
  const port = Number(process.env.PORT) || 3000;
  try {
    const app = new App(port, prisma);
    app.init();

    const server = http.createServer(app.instance);
    server.listen(port, () => {
      console.log(app.message);
    });
  } catch (error) {
    console.log(error);
  }
};

main();

const shutdown = async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
};
process.on("SIGINT", shutdown); // Handling Ctrl + C
process.on("SIGTERM", shutdown); //
