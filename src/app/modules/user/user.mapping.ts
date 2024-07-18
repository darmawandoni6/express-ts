import type { Profile } from "@type/user";

import type { InstancesUser } from "./user.model";

class UserMapping {
  static profile(item: InstancesUser | null): Profile | null {
    if (!item) return null;

    return {
      id: item.id,
      roleId: item.roleId,
      username: item.username,
      password: "",
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      role: { id: item.role!.id, name: item.role!.name, status: item.role!.status },
    };
  }
}
export default UserMapping;
