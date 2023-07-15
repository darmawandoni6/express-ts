import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";
import RoleModel from "@modules/role/model";

import { UserAttributes } from "./interface";

type UserCreationAttributes = Optional<UserAttributes, "id">;
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  roleId?: number;
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
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true },
);

RoleModel.hasOne(UserModel);
UserModel.belongsTo(RoleModel);

export default UserModel;
