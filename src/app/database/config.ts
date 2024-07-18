import type { Options } from "sequelize";
import sqlite3 from "sqlite3";

class ConfigDB {
  static SQLITE: Options = {
    dialect: "sqlite",
    dialectModule: sqlite3.verbose(),
    storage: `./${process.env.DATABASE_NAME}.sqlite3`,
  };
}

export default ConfigDB;
