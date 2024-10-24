func Initialize() (*DB, error) {
    conn, err := sql.Open("sqlite3", "local.db")
    if err != nil {
        return nil, err
    }

    tables := []string{
        `CREATE TABLE IF NOT EXISTS system_configs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT NOT NULL UNIQUE,
            value TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS notifications_config (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email0 VARCHAR(128) DEFAULT '',
            email1 VARCHAR(128) DEFAULT '',
            fresh_low INTEGER NOT NULL DEFAULT 20,
            fresh_high INTEGER NOT NULL DEFAULT 99,
            grey_high INTEGER NOT NULL DEFAULT 75,
            black_high INTEGER NOT NULL DEFAULT 75,
            battery_low FLOAT NOT NULL DEFAULT 11.8,
            ignition BOOLEAN DEFAULT 1,
            generator BOOLEAN DEFAULT 1,
            lpg_low INTEGER NOT NULL DEFAULT 33,
            acpower BOOLEAN DEFAULT 1
        );`,
		`CREATE TABLE "user_presets" (
			"id" INTEGER PRIMARY KEY AUTOINCREMENT,
			"name" TEXT NOT NULL,
			"data" TEXT
		);`,
		`CREATE TABLE "network_settings" (
			"id" INTEGER PRIMARY KEY AUTOINCREMENT,
			"ap_name" VARCHAR(128) DEFAULT 'CoachHub',
			"ap_pass" VARCHAR(128) DEFAULT 'coachhub01',
			"wifi_name" VARCHAR(128) DEFAULT '',
			"wifi_pass" VARCHAR(128) DEFAULT '',
			"dhcp" BOOLEAN DEFAULT 1,
			"ip_addr" VARCHAR(15),
			"netmask" VARCHAR(15),
			"gateway" VARCHAR(15)
		);`,
		`CREATE TABLE "notification_rules" (
			"id" INTEGER PRIMARY KEY AUTOINCREMENT,
			"type" TEXT NOT NULL,
			"test" TEXT NOT NULL,
			"value" TEXT NOT NULL,
			"unit" TEXT,
			"test_value" TEXT,
			"status" TEXT DEFAULT 'active'
		);`,
		`CREATE TABLE "messages" (
			"id" INTEGER PRIMARY KEY AUTOINCREMENT,
			"pgn" INTEGER,
			"data" TEXT,
			"timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,
		// Other table creations follow similarly...
	}

    for _, table := range tables {
        if _, err := conn.Exec(table); err != nil {
            log.Fatalf("Failed to create table: %v", err)
        }
    }

    return &DB{Conn: conn}, nil
}
