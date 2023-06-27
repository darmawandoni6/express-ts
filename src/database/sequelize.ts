import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: `./src/database/storage/${process.env.ENV}.sqlite3`,
});

export default sequelize;
