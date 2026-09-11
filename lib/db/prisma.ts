import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';

if (!process.env.DATABASE_URL && typeof process.loadEnvFile === 'function' && fs.existsSync('.env')) {
  try {
    process.loadEnvFile('.env');
  } catch {
    // Ignore if not present or cannot read
  }
}

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

/**
 * Helper to check if the database is actively reachable.
 */
export async function isDatabaseReachable(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[UdyogFlow DB] Database unreachable or connection failed:', (error as Error).message);
    }
    return false;
  }
}
