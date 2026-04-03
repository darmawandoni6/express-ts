import { PrismaClient } from "@prisma-generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

export class PrismaConfig {
  private connectionString = `${process.env.DATABASE_URL}`;

  private adapter: PrismaPg;
  private static prismaClient: PrismaClient;

  constructor() {
    this.adapter = new PrismaPg({ connectionString: this.connectionString });
  }

  static async init() {
    const config = new PrismaConfig();
    this.prismaClient = new PrismaClient({
      adapter: config.adapter,
      log: ["error"],
      transactionOptions: {
        maxWait: 5000,
        timeout: 15000,
      },
    });
    config.connectDB(this.prismaClient);
    return config;
  }

  static getConfig() {
    return {
      prisma: this.prismaClient,
    };
  }

  static shutdown = async () => {
    console.log("🛑 Shutting down...");

    try {
      await this.prismaClient.$disconnect();
      console.log("✅ Prisma disconnected");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error during disconnect", error);
      process.exit(1);
    }
  };

  private async connectDB(config: PrismaClient) {
    try {
      await config.$connect();
      console.log("✅ Database connected");
    } catch (error) {
      console.error("❌ Database connection failed", error);
      process.exit(1); // stop app kalau gagal
    }
  }
}
