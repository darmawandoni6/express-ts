import type { FindOptions, ModelStatic, WhereOptions } from "sequelize";

import type { User } from "@type/user";

import type { Attributes, InstancesUser } from "./user.model";

class UserRepository {
  private user: ModelStatic<InstancesUser>;

  constructor(model: ModelStatic<InstancesUser>) {
    this.user = model;
  }

  async create(payload: Attributes): Promise<void> {
    await this.user.create(payload);
  }
  async findOne(options: FindOptions<InstancesUser>): Promise<InstancesUser | null> {
    const data = await this.user.findOne(options);
    return data;
  }
  async update(payload: Partial<User>, where: WhereOptions<User>): Promise<void> {
    await this.user.update(payload, { where });
  }
  async destroy(where: WhereOptions<User>): Promise<void> {
    await this.user.destroy({ where });
  }
}
export default UserRepository;
