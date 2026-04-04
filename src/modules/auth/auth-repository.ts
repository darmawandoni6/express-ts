import { UserRepository } from "@common/shared/repository/user-repository";
import type { User } from "@prisma-generated/client";

export class AuthRepository extends UserRepository {
  private static instance: AuthRepository;

  private constructor() {
    super();
  }

  static getInstance(): AuthRepository {
    if (!AuthRepository.instance) {
      AuthRepository.instance = new AuthRepository();
    }
    return AuthRepository.instance;
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    const count = await this.User.count({ where: { email } });
    return count > 0;
  }

  async getUser(email: string): Promise<User | null> {
    const data = await this.User.findFirst({ where: { email } });
    return data;
  }
}
