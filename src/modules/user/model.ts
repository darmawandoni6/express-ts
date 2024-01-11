import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";
import RoleModel from "@modules/role/model";

import { UserAttributes } from "./interface";

type UserCreationAttributes = Optional<UserAttributes, "id">;
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const UserModel = sequelize.define<UserInstance>(
  "users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true },
);

RoleModel.hasOne(UserModel, { foreignKey: "roleId" });
UserModel.belongsTo(RoleModel);

export default UserModel;
