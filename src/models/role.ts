import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@database/sequelize";

export interface RoleAtributes {
  id: number;
  name: string;
  status: boolean;
}

type RoleCreationAttributes = Optional<RoleAtributes, "id">;
interface RoleInstance extends Model<RoleAtributes, RoleCreationAttributes>, RoleAtributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const RoleModel = sequelize.define<RoleInstance>("role", {
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
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
});

export default RoleModel;
