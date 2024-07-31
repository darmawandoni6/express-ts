import type { Model, Optional, Sequelize } from "sequelize";
import { DataTypes } from "sequelize";

import Bcrypt from "@pkg/bcrypt";
import type { User } from "@type/user";

import type { InstancesRole } from "./role-model";

type Attributes = User.Attributes;

interface Instances extends Model<Attributes, Optional<Attributes, "id">>, Attributes {
  role?: InstancesRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { Instances as InstancesUser };

const userModel = (seqlize: Sequelize) => {
  const User = seqlize.define<Instances>(
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
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );

  function encryptPassword(instance: Instances) {
    let { password } = instance;
    password = Bcrypt.encrypt(password);
    instance.setDataValue("password", password);
  }

  User.addHook("beforeCreate", encryptPassword);
  User.addHook("beforeUpdate", encryptPassword);

  return User;
};

export default userModel;
