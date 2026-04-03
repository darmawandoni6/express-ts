import { encrypt } from "@common/utils/bcrypt";
import type { UserCreateInput } from "@prisma-generated/models";

export class UserService {
  userPayload(user: UserCreateInput): UserCreateInput {
    const payload: UserCreateInput = {
      ...user,
      password: encrypt(user.password),
    };

    return payload;
  }
}
