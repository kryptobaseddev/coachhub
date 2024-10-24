// web/src/lib/drizzle.js
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

// Configure the SQLite client
const client = createClient({
    url: 'file:./coachhub.db', // Adjust path as needed
});

export const db = drizzle(client);
