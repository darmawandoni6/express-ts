import type { UserCreateInput } from "@prisma-generated/models";
import { encrypt } from "@util/bcrypt";

export class UserUsecase {
  userPayload(user: UserCreateInput): UserCreateInput {
    const payload: UserCreateInput = {
      ...user,
      password: encrypt(user.password),
    };

    return payload;
  }
}
