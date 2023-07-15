import env from "dotenv";
import { Sequelize } from "sequelize";

env.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: `./src/databases/sqlite/${process.env.ENV}.sqlite3`,
});

export default sequelize;
