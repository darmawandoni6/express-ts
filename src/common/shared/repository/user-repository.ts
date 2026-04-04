import { PrismaConfig } from "@config/prisma";
import type { Prisma } from "@prisma-generated/client";

export class UserRepository {
  protected readonly User;

  protected constructor() {
    this.User = PrismaConfig.prisma.user;
  }

  async create(data: Prisma.UserCreateInput): Promise<void> {
    await this.User.create({ data });
  }

  async count(email: string): Promise<number> {
    const res = await this.User.count({ where: { email } });
    return res;
  }
}
