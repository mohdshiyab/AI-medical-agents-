import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);

// ✅ don’t wrap sql in { client: ... }
export const db = drizzle(sql);
