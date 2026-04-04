import logger from "@common/utils/logger";
import { PrismaClient } from "@prisma-generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

export class PrismaConfig {
  private static prismaClient: PrismaClient;

  private constructor() {}

  static async init() {
    if (this.prismaClient) {
      return;
    }
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    this.prismaClient = new PrismaClient({
      adapter,
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
      ],
      transactionOptions: { maxWait: 5000, timeout: 15000 },
    });

    await this.prismaClient.$connect();
    logger.info("✅ Database connected");
  }

  static get prisma() {
    if (!this.prismaClient) {
      throw new Error("Prisma belum di-init!");
    }
    return this.prismaClient;
  }

  static async shutdown() {
    await this.prismaClient?.$disconnect();
    logger.info("🛑 Database disconnected...");
  }
}
