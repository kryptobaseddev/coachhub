import { sql } from 'drizzle-orm/sql';
import { db } from '$lib/drizzle';

export const notificationRules = db.table('notification_rules', {
    id: sql.number().primaryKey(),
    type: sql.text(),
    test: sql.text(),
    value: sql.text(),
    unit: sql.text(),
    test_value: sql.text(),
    status: sql.text().default('active')
});
