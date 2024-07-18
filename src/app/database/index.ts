import type { ModelStatic, Options } from "sequelize";
import { Sequelize } from "sequelize";

import Bcrypt from "@helpers/bcrypt";
import type { InstancesRole } from "@modules/role/role.model";
import roleModel from "@modules/role/role.model";
import type { InstancesUser } from "@modules/user/user.model";
import userModel from "@modules/user/user.model";

class Database {
  private _db!: Sequelize;
  private _models!: {
    Role: ModelStatic<InstancesRole>;
    User: ModelStatic<InstancesUser>;
  };

  private config: Options;
  constructor(config: Options) {
    this.config = config;
  }

  async __init() {
    this._db = new Sequelize({
      ...this.config,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
    await this._db.authenticate();
    this.modelAsociate();
  }

  private modelAsociate(): void {
    const model: typeof this._models = {
      Role: roleModel.model(this._db),
      User: userModel.model(this._db),
    };

    model.Role.hasMany(model.User, { foreignKey: "roleId" });
    model.User.belongsTo(model.Role, { foreignKey: "roleId" });

    this._models = model;
  }

  get model(): typeof this._models {
    return this._models;
  }

  async syncDb(seed?: boolean) {
    try {
      for (const model of Object.values(this._models)) {
        await model.sync();
      }
      if (seed) {
        await this.createSeed();
      }

      console.log("success sync");
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  get connection(): Sequelize {
    return this._db;
  }

  private async createSeed(): Promise<void> {
    const t = await this.connection.transaction();
    try {
      const check = await this.model.Role.count({ where: { name: "admin" } });
      if (!check) {
        const role = await this.model.Role.create({ name: "admin", status: true }, { transaction: t });
        await this.model.User.create(
          { username: "user1", password: Bcrypt.encrypt("kiasu123"), roleId: role.id },
          { transaction: t },
        );
      }
      t.commit();
    } catch (error) {
      t.rollback();
      console.log({ error: (error as Error).message });
      return Promise.resolve();
    }
  }
}
export default Database;
