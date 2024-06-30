import "dotenv/config";

import { app, message, port } from "./app";
import db from "@driver/index";

app.listen(port, async () => {
  try {
    try {
      db.sequelize.authenticate();
    } catch (error) {
      console.log((error as Error).message);
      process.exit(-1);
    }

    console.log(message);
  } catch (error) {
    console.log((error as Error).message);
    process.exit(-1);
  }
});
