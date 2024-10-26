// web/src/lib/models/messages.js
import { sql } from 'drizzle-orm/sql';
import { db } from '$lib/server/db';

// Define the messages schema
export const messages = db.table('messages', {
    id: sql.number().primaryKey(),
    pgn: sql.number(),
    data: sql.text(),
    timestamp: sql.date().default('CURRENT_TIMESTAMP'),
});

// Example function to fetch all messages
export async function fetchMessages() {
    return await db.select().from(messages).all();
}

// Example function to insert a message
export async function insertMessage(pgn, data) {
    return await db.insert(messages).values({ pgn, data }).execute();
}
