import type { Model, Optional, Sequelize } from "sequelize";
import { DataTypes } from "sequelize";

import type { Role } from "@type/role";

type Attributes = Role.Attributes;

interface Instances extends Model<Attributes, Optional<Attributes, "id">>, Attributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export type { Instances as InstancesRole };

const roleModel = (seqlize: Sequelize) => {
  return seqlize.define<Instances>(
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
        unique: true,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      freezeTableName: true,
    }
  );
};

export default roleModel;
