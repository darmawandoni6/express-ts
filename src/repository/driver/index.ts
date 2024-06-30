import fileStorageModel from "@database/fileStorage/fileStorage.model";
import { sequelize } from "./sqlite";
import userModel from "@database/user/user.model";
import roleModel from "@database/role/role.model";

const db = {
  sequelize,
  role: roleModel.model(sequelize),
  user: userModel.model(sequelize),
};

db.role.hasOne(db.user, { foreignKey: "roleId" });
db.user.belongsTo(db.role, { foreignKey: "roleId" });

export default db;
