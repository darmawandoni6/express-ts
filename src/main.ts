import env from "dotenv";
import http from "http";

import App from "./app";
import Database from "./app/database";
import ConfigDB from "./app/database/config";
import Service from "./service";

const main = async () => {
  env.config();

  const port = Number(process.env.PORT) || 3000;

  const app = new App(port);
  const db = new Database(ConfigDB.SQLITE);
  try {
    await db.__init();

    console.log(`Connected to ${process.env.DATABASE_NAME} database `);
    console.log("Starting server...");
    const service = new Service(db);
    app.__init(service);
    const server = http.createServer(app.instance);

    server.listen(port, () => {
      console.log(app.message);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
