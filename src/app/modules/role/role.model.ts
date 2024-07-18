import type { Model, Optional, Sequelize } from "sequelize";
import { DataTypes } from "sequelize";

import type { Role } from "@type/role";

type Attributes = Optional<Role, "id">;

interface Instances extends Model<Role, Attributes>, Role {
  createdAt?: Date;
  updatedAt?: Date;
}

export type { Attributes, Instances as InstancesRole };
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
