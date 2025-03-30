import { PrismaClient } from "@prisma/client"

// PrismaClient가 개발 중 핫 리로딩으로 인해 여러 인스턴스가 생성되는 것을 방지
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
