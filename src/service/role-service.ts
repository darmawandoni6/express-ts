import type { WhereOptions } from "sequelize";

import { model } from "@database/index";
import type { Role } from "@type/role";

class RoleService {
  static async create(payload: Role.Attributes): Promise<void> {
    await model.Role.create(payload);
  }
  static async findOne(where: WhereOptions<Role.Attributes>): Promise<Role.Attributes | null> {
    const data = await model.Role.findOne({ where });
    return data ? data.toJSON() : null;
  }
  static async findAll(): Promise<Role.Attributes[]> {
    const data = await model.Role.findAll();

    return data.map((item) => item.toJSON());
  }
  static async update(payload: Partial<Role.Attributes>, where: WhereOptions<Role.Attributes>): Promise<void> {
    await model.Role.update(payload, { where });
  }
  static async remove(where: WhereOptions<Role.Attributes>): Promise<void> {
    await model.Role.destroy({ where });
  }
}
export default RoleService;
