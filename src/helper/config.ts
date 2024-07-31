import { Options } from "sequelize";
import sqlite3 from "sqlite3";

class Config {
  static DATABASE: Options = {
    dialect: "sqlite",
    dialectModule: sqlite3.verbose(),
    storage: `./${process.env.DATABASE_NAME}.sqlite3`,
  };
}

export default Config;
