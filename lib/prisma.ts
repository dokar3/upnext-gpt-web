// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  const g = global as any;
  if (!g.prisma) {
    g.prisma = new PrismaClient();
  }
  prisma = g.prisma;
}

export default prisma;
