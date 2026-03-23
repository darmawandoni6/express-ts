import type { PrismaClient, User } from "@prisma-generated/client";
import { UserService } from "@shared/service/user-service";

export class AuthService extends UserService {
  constructor(prisma: PrismaClient) {
    super(prisma.user); // Pass PrismaClient to parent
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
