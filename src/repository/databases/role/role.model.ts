import type { Role } from "@usecase/role/role.type";
import type { Model, Sequelize } from "sequelize";
import { DataTypes } from "sequelize";

type Attributes = Role;

type Instances = {
  createdAt?: Date;
  updatedAt?: Date;
} & Model<Role> &
  Role;

export type { Attributes };
export default {
  model: (sequelize: Sequelize) => {
    return sequelize.define<Instances>(
      "role",
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
      {
        freezeTableName: true,
      },
    );
  },
};
