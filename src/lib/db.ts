import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Resolve the SQLite database relative to the project root so the app
// can be deployed anywhere (no absolute paths baked in).
const databaseUrl = `file:${path.join(process.cwd(), 'db', 'custom.db')}`

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: databaseUrl,
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
