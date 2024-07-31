import { Sequelize } from "sequelize";

import Config from "@helper/config";

import roleModel from "./table/role-model";
import userModel from "./table/user-model";

const sequelize = new Sequelize({ ...Config.DATABASE, logging: false });
sequelize.authenticate();

const model = {
  Role: roleModel(sequelize),
  User: userModel(sequelize),
};

model.Role.hasMany(model.User, { foreignKey: "roleId" });
model.User.belongsTo(model.Role, { foreignKey: "roleId" });

const syncModel = async () => {
  for (const m of Object.values(model)) {
    await m.sync();
  }
};

export { sequelize, model, syncModel };
