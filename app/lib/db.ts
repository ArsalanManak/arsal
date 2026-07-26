import { Pool } from "pg";

const globalForPg = global as typeof globalThis & {
  pgPool?: Pool;
};

export function getPool(): Pool {
  if (!globalForPg.pgPool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL is not set in the environment.");
    }

    globalForPg.pgPool = new Pool({ connectionString });
  }

  return globalForPg.pgPool;
}
