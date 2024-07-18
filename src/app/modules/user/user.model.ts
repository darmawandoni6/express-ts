import type { Model, Optional, Sequelize } from "sequelize";
import { DataTypes } from "sequelize";

import type { InstancesRole } from "@modules/role/role.model";
import type { User } from "@type/user";

type Attributes = Optional<User, "id">;

interface Instances extends Model<User, Attributes>, User {
  role?: InstancesRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { Attributes, Instances as InstancesUser };
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
