import type { WhereOptions } from "sequelize";

import type { Role } from "@type/role";

import type { Attributes } from "./role.model";
import type RoleRepository from "./role.repository";

class RoleService {
  private roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async create(payload: Attributes): Promise<void> {
    await this.roleRepository.create(payload);
  }
  async findOne(where: WhereOptions<Role>): Promise<Role | null> {
    const data = await this.roleRepository.findOne(where);
    return data;
  }
  async findAll(): Promise<Role[]> {
    const data = await this.roleRepository.findAll();
    return data.map((item) => item.toJSON());
  }
  async update(payload: Partial<Role>, where: WhereOptions<Role>): Promise<void> {
    await this.roleRepository.update(payload, where);
  }
  async remove(where: WhereOptions<Role>): Promise<void> {
    await this.roleRepository.destroy(where);
  }
}
export default RoleService;
