import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@databases/sequelize";

import { RoleAtributes } from "./interface";

type RoleCreationAttributes = Optional<RoleAtributes, "id">;
interface RoleInstance extends Model<RoleAtributes, RoleCreationAttributes>, RoleAtributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const RoleModel = sequelize.define<RoleInstance>(
  "roles",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { freezeTableName: true },
);

export default RoleModel;
