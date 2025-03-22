import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["error"],
  errorFormat: "pretty",
  transactionOptions: {
    maxWait: 5000,
    timeout: 15000,
  },
});
