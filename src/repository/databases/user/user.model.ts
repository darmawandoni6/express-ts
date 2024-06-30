import type { User } from "@usecase/user/user.type";
import type { Model, Sequelize } from "sequelize";
import { DataTypes } from "sequelize";

type Attributes = User;

type Instances = {
  createdAt?: Date;
  updatedAt?: Date;
} & Model<User> &
  User;

export type { Attributes };
export default {
  model: (sequelize: Sequelize) => {
    return sequelize.define<Instances>(
      "user",
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
      {
        freezeTableName: true,
      },
    );
  },
};
