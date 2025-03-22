import type { Prisma, PrismaClient, User } from "@prisma/client";

export class UserRepository {
  private readonly User;

  constructor(prisma: PrismaClient) {
    this.User = prisma.user;
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    const count = await this.User.count({ where: { email } });
    return count > 0;
  }

  async getUser(email: string): Promise<User | null> {
    const data = await this.User.findFirst({ where: { email } });
    return data;
  }

  async create(data: Prisma.UserCreateInput): Promise<void> {
    await this.User.create({ data });
  }
}
