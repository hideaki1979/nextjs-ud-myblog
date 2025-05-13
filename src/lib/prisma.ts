import { PrismaClient } from "@prisma/client"

// Prismaのグローバルインスタンス作成
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Prismaインスタンス生成
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// 開発環境のみ
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma