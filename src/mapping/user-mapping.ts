import type { InstancesUser } from "@database/table/user-model";
import type { User } from "@type/user";

class UserMapping {
  static profile(item: InstancesUser | null): User.Profile | null {
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
