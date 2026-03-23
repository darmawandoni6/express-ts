import { PrismaClient } from "@prisma-generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

export class PrismaConfig {
  private connectionString = `${process.env.DATABASE_URL}`;

  private adapter: PrismaPg;
  private static prismaClient: PrismaClient;

  constructor() {
    this.adapter = new PrismaPg({ connectionString: this.connectionString });
  }

  static init() {
    const config = new PrismaConfig();
    this.prismaClient = new PrismaClient({
      adapter: config.adapter,
      log: ["error"],
      transactionOptions: {
        maxWait: 5000,
        timeout: 15000,
      },
    });
    return config;
  }

  static getConfig() {
    return {
      prisma: this.prismaClient,
    };
  }
}
