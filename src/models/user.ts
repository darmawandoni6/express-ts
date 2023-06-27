import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@database/sequelize";

import RoleModel, { RoleAtributes } from "./role";

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  roleId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  role?: RoleAtributes;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserModel = sequelize.define<UserInstance>("user", {
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
  roleId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

RoleModel.hasOne(UserModel, { foreignKey: "roleId" });
UserModel.belongsTo(RoleModel);

export default UserModel;
