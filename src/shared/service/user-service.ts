import type { Prisma, PrismaClient } from "@prisma-generated/client";

export class UserService {
  protected readonly User;

  constructor(user: PrismaClient["user"]) {
    this.User = user;
  }

  async create(data: Prisma.UserCreateInput): Promise<void> {
    await this.User.create({ data });
  }

  async count(email: string): Promise<number> {
    const res = await this.User.count({ where: { email } });
    return res;
  }
}
