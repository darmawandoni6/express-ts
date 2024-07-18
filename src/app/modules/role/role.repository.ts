import type { ModelStatic, WhereOptions } from "sequelize";

import type { Role } from "@type/role";

import type { Attributes, InstancesRole } from "./role.model";

class RoleRepository {
  private role: ModelStatic<InstancesRole>;

  constructor(model: ModelStatic<InstancesRole>) {
    this.role = model;
  }

  async create(payload: Attributes): Promise<void> {
    await this.role.create(payload);
  }
  async findOne(where: WhereOptions<Role>): Promise<InstancesRole | null> {
    const data = await this.role.findOne({ where });
    return data;
  }
  async findAll(): Promise<InstancesRole[]> {
    const data = await this.role.findAll();
    return data;
  }
  async update(payload: Partial<Role>, where: WhereOptions<Role>): Promise<void> {
    await this.role.update(payload, { where });
  }
  async destroy(where: WhereOptions<Role>): Promise<void> {
    await this.role.destroy({ where });
  }
}
export default RoleRepository;
