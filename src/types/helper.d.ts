import type { ModelStatic } from "sequelize";

export interface HelperUser {
  model: {
    Role: ModelStatic<InstancesRole>;
  };
}
