import { sql } from 'drizzle-orm/sql';
import { db } from '$lib/drizzle';

export const rvcData = db.table('rvc_data', {
    id: sql.number().primaryKey(),
    pgn: sql.number(),
    source: sql.number(),
    data: sql.text(),
    timestamp: sql.date().default('CURRENT_TIMESTAMP'),
});
