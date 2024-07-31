import "dotenv/config";
import http from "http";

import App from "./application/app";
import { sequelize, syncModel } from "./application/database";

const main = async () => {
  const port = Number(process.env.PORT) || 3000;

  try {
    await sequelize.authenticate();
    await syncModel();

    const app = new App(port);
    app.init();

    const server = http.createServer(app.instance);
    server.listen(port, () => console.log(app.message));
  } catch (error) {
    console.log(error);
  }
};

main();
