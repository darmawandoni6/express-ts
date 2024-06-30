import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  dialectModule: sqlite3.verbose(),
  storage: "./development.sqlite3",
});
