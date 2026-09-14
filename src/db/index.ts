import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let pool: Pool | null = null;
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    dbInstance = drizzle(pool, { schema });
  } catch (err) {
    console.warn("Failed to initialize postgres pool with DATABASE_URL:", err);
  }
}

export const db = dbInstance;
export { pool };
export * from "./schema";
