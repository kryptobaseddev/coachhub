package db

import (
	"database/sql"
	"log"
	"time"

	"github.com/kryptobaseddev/coachhub/internal/rvc"
	_ "github.com/mattn/go-sqlite3"
)

type DB struct {
	Conn *sql.DB
}

func Initialize() (*DB, error) {
	conn, err := sql.Open("sqlite3", "local.db")
	if err != nil {
        return nil, err
    }

    tables := []string{
		// System configs
		`CREATE TABLE IF NOT EXISTS system_configs (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			key TEXT NOT NULL UNIQUE,
			value TEXT,
			timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,
		// Insert system-level configs
		`INSERT OR IGNORE INTO system_configs (key, value) VALUES 
			('version', '1.0.0'),
			('aquahot', 'false'),
			('floorheat', 'false'),
			('ceilfan', 'false'),
			('tvlift', 'false'),
			('thirdstat', 'false');`,
		// System config history
		`CREATE TABLE IF NOT EXISTS system_config_history (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			key TEXT NOT NULL,
			value TEXT,
			timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,
		// Current motorhome configuration
		`CREATE TABLE IF NOT EXISTS current_motorhome_config (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			model_id INTEGER NOT NULL,
			model_year_id INTEGER NOT NULL,
			floorplan_id INTEGER NOT NULL,
			FOREIGN KEY (model_id) REFERENCES motorhome_models(id),
			FOREIGN KEY (model_year_id) REFERENCES motorhome_model_years(id),
			FOREIGN KEY (floorplan_id) REFERENCES motorhome_floorplans(id)
		);`,
		// Users table default user role is user
		`CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			email TEXT NOT NULL UNIQUE,
			role_id INTEGER NOT NULL DEFAULT 2,
			FOREIGN KEY (role_id) REFERENCES roles(id),
			phone TEXT NOT NULL,
			preset_id INTEGER NOT NULL DEFAULT 1,
			password TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			last_login DATETIME,
			status INTEGER NOT NULL DEFAULT 1 CHECK (status IN (0, 1)),
			preset_id INTEGER NOT NULL,
			FOREIGN KEY (preset_id) REFERENCES user_presets(id),
		);`,
		// Roles table
		`CREATE TABLE IF NOT EXISTS roles (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE
		);`,
		// Insert default roles
		`INSERT OR IGNORE INTO roles (name) VALUES ('admin'), ('user');`,
		// Insert default admin user
		`INSERT OR IGNORE INTO users (username, email, role_id, phone, preset_id, password, created_at, status) VALUES ('admin', 'admin@example.com', 1, '1234567890', 1, 'coachhub24', datetime('now'), 1);`,
		// Notifications config
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
		// User presets
		`CREATE TABLE IF NOT EXISTS user_presets (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			data TEXT,
			user_id INTEGER NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users(id),
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,
		// Network settings
		`CREATE TABLE IF NOT EXISTS network_settings (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			ap_name VARCHAR(128) DEFAULT 'CoachHub',
			ap_pass VARCHAR(128) DEFAULT 'coachhub01',
			wifi_name VARCHAR(128) DEFAULT '',
			wifi_pass VARCHAR(128) DEFAULT '',
			dhcp BOOLEAN DEFAULT 1,
			ip_addr VARCHAR(15),
			netmask VARCHAR(15),
			gateway VARCHAR(15)
		);`,
		// DDNS providers
		`CREATE TABLE IF NOT EXISTS network_ddns_providers (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			api_url TEXT NOT NULL
		);`,
		// DDNS settings
		`CREATE TABLE IF NOT EXISTS network_ddns_settings (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			ddns_name VARCHAR(128) DEFAULT '',
			ddns_pass VARCHAR(128) DEFAULT '',
			ddns_domain VARCHAR(128) DEFAULT '',
			ddns_provider_id INTEGER NOT NULL,
			FOREIGN KEY (ddns_provider_id) REFERENCES network_ddns_providers(id),
			ddns_api_key VARCHAR(128) DEFAULT ''
		);`,
		// Notification rules
		`CREATE TABLE IF NOT EXISTS notification_rules (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			type TEXT NOT NULL,
			test TEXT NOT NULL,
			value TEXT NOT NULL,
			unit TEXT,
			test_value TEXT,
			status TEXT DEFAULT 'active'
		);`,
		// Messages
		`CREATE TABLE IF NOT EXISTS messages (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			pgn INTEGER,
			data TEXT,
			timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,
		// RVC data
		`CREATE TABLE IF NOT EXISTS rvc_data (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			pgn INTEGER,
			source INTEGER,
			data TEXT,
			timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,
		// RVC specs
		`CREATE TABLE IF NOT EXISTS rvc_spec (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			spec TEXT
		);`,
		// Motorhome models
		`CREATE TABLE IF NOT EXISTS motorhome_models (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT,
			image_url TEXT
		);`,
		// Motorhome Model Years
		`CREATE TABLE IF NOT EXISTS motorhome_model_years (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			model_id INTEGER NOT NULL,
			year INTEGER NOT NULL,
			FOREIGN KEY (model_id) REFERENCES motorhome_models(id)
		);`,
		// Motorhome Floorplans
		`CREATE TABLE IF NOT EXISTS motorhome_floorplans (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			model_id INTEGER NOT NULL,
			name TEXT NOT NULL,
			description TEXT,
			FOREIGN KEY (model_id) REFERENCES motorhome_models(id),
			image_url TEXT
		);`,
		// Floorplan devices
		`CREATE TABLE IF NOT EXISTS motorhome_floorplan_devices (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			floorplan_id INTEGER NOT NULL,
			device_id INTEGER NOT NULL,
			FOREIGN KEY (floorplan_id) REFERENCES motorhome_floorplans(id),
			FOREIGN KEY (device_id) REFERENCES devices(id)
		);`,
		// Devices
		`CREATE TABLE IF NOT EXISTS devices (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT,
			type_id INTEGER NOT NULL,
			FOREIGN KEY (type_id) REFERENCES device_types(id)
		);`,
		// Device types
		`CREATE TABLE IF NOT EXISTS device_types (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT
		);`,
	}

    for _, table := range tables {
        if _, err := conn.Exec(table); err != nil {
            log.Fatalf("Failed to create table: %v", err)
        }
    }

    return &DB{Conn: conn}, nil
}

func CreateNewUser(db *sql.DB, user *User) error {
	stmt, err := db.Prepare("INSERT INTO users (username, email, role_id, phone, preset_id, password, created_at, status) VALUES (?, ?, ?, ?, ?, ?, datetime('now'), 1)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(user.Username, user.Email, user.RoleID, user.Phone, user.PresetID, user.Password)
	return err
}

func ReadUser(db *sql.DB, id int) (*User, error) {
	stmt, err := db.Prepare("SELECT * FROM users WHERE id = ?")
	if err != nil {
		return nil, err
	}
	var user User
	err = stmt.QueryRow(id).Scan(&user.ID, &user.Username, &user.Email, &user.RoleID, &user.Phone, &user.PresetID, &user.Password, &user.CreatedAt, &user.UpdatedAt, &user.LastLogin, &user.Status)
	return &user, err
}

func UpdateUser(db *sql.DB, user *User) error {
	stmt, err := db.Prepare("UPDATE users SET username = ?, email = ?, role_id = ?, phone = ?, preset_id = ?, password = ?, updated_at = datetime('now'), status = ? WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(user.Username, user.Email, user.RoleID, user.Phone, user.PresetID, user.Password, user.UpdatedAt, user.Status, user.ID)
	return err
}

func DeleteUser(db *sql.DB, id int) error {
	stmt, err := db.Prepare("DELETE FROM users WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id)
	return err
}

type User struct {
	Username string
	Email string
	RoleID int
	Phone string
	PresetID int
	Password string
	ID int
	CreatedAt time.Time
	UpdatedAt time.Time
	LastLogin time.Time
	Status int
}

type UserPreset struct {
	ID int
	Name string
	Data string
	UserID int
	CreatedAt time.Time
	UpdatedAt time.Time
}

func CreateUserPreset(db *sql.DB, preset *UserPreset) error {
	stmt, err := db.Prepare("INSERT OR REPLACE INTO user_presets (name, data, user_id, created_at, updated_at) VALUES (?, ?, ?, datetime('now'), datetime('now'))")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(preset.Name, preset.Data, preset.UserID)
	return err
}

func ReadUserPresets(db *sql.DB) ([]UserPreset, error) {
	stmt, err := db.Prepare("SELECT * FROM user_presets")
	if err != nil {
		return nil, err
	}
	var presets []UserPreset
	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var preset UserPreset
		err = rows.Scan(&preset.Name, &preset.Data)
		if err != nil {
			return nil, err
		}
		presets = append(presets, preset)
	}
	return presets, nil
}	

func UpdateUserPreset(db *sql.DB, preset *UserPreset) error {
	stmt, err := db.Prepare("UPDATE user_presets SET name = ?, data = ?, updated_at = datetime('now') WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(preset.Name, preset.Data, preset.ID)
	return err
}

func SaveRVCMessage(db *sql.DB, message *rvc.Message) error {
    stmt, err := db.Prepare("INSERT INTO rvc_data(pgn, source, data, timestamp) VALUES (?, ?, ?, datetime('now'))")
    if err != nil {
        return err
    }
    defer stmt.Close()

    _, err = stmt.Exec(message.PGN, message.Source, message.Data)
    return err
}

func GetSystemConfig(db *sql.DB, key string) (string, error) {
	stmt, err := db.Prepare("SELECT value FROM system_configs WHERE key = ?")
	if err != nil {
		return "", err
	}
	var value string
	err = stmt.QueryRow(key).Scan(&value)
	return value, err
}

func SetSystemConfig(db *sql.DB, key, value string) error {
	stmt, err := db.Prepare("INSERT OR REPLACE INTO system_configs (key, value) VALUES (?, ?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(key, value)
	return err
}

type MotorhomeConfig struct {
	ID int
	ModelID int
	ModelYearID int
	FloorplanID int
}

func SetCurrentMotorhomeConfig(db *sql.DB, config *MotorhomeConfig) error {
	stmt, err := db.Prepare("INSERT OR REPLACE INTO current_motorhome_config (model_id, model_year_id, floorplan_id) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(config.ModelID, config.ModelYearID, config.FloorplanID)
	return err
}

func ReadCurrentMotorhomeConfig(db *sql.DB) (*MotorhomeConfig, error) {
	stmt, err := db.Prepare("SELECT model_id, model_year_id, floorplan_id FROM current_motorhome_config")
	if err != nil {
		return nil, err
	}
	var config MotorhomeConfig
	err = stmt.QueryRow().Scan(&config.ModelID, &config.ModelYearID, &config.FloorplanID)
	return &config, err
}

func UpdateCurrentMotorhomeConfig(db *sql.DB, config *MotorhomeConfig) error {
	stmt, err := db.Prepare("UPDATE current_motorhome_config SET model_id = ?, model_year_id = ?, floorplan_id = ? WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(config.ModelID, config.ModelYearID, config.FloorplanID, config.ID)
	return err
}

func CreateMotorhomeModel(db *sql.DB, model *MotorhomeModel) error {
	stmt, err := db.Prepare("INSERT INTO motorhome_models (name, description, image_url) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(model.Name, model.Description, model.ImageURL)
	return err
}

func ReadMotorhomeModels(db *sql.DB) ([]MotorhomeModel, error) {
	stmt, err := db.Prepare("SELECT * FROM motorhome_models")
	if err != nil {
		return nil, err
	}
	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var models []MotorhomeModel
	for rows.Next() {
		var model MotorhomeModel
		err = rows.Scan(&model.ID, &model.Name, &model.Description, &model.ImageURL)
		if err != nil {
			return nil, err
		}
		models = append(models, model)
	}
	return models, nil
}

func UpdateMotorhomeModel(db *sql.DB, model *MotorhomeModel) error {
	stmt, err := db.Prepare("UPDATE motorhome_models SET name = ?, description = ?, image_url = ? WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(model.Name, model.Description, model.ImageURL, model.ID)
	return err
}

func DeleteMotorhomeModel(db *sql.DB, id int) error {
	stmt, err := db.Prepare("DELETE FROM motorhome_models WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id)
	return err
}

func CreateMotorhomeModelYear(db *sql.DB, modelYear *MotorhomeModelYear) error {
	stmt, err := db.Prepare("INSERT INTO motorhome_model_years (model_id, year) VALUES (?, ?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(modelYear.ModelID, modelYear.Year)
	return err
}

func ReadMotorhomeModelYears(db *sql.DB) ([]MotorhomeModelYear, error) {
	stmt, err := db.Prepare("SELECT * FROM motorhome_model_years")
	if err != nil {
		return nil, err
	}
	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	defer rows.Close()	

	var modelYears []MotorhomeModelYear
	for rows.Next() {
		var modelYear MotorhomeModelYear
		err = rows.Scan(&modelYear.ID, &modelYear.ModelID, &modelYear.Year)
		if err != nil {
			return nil, err
		}
		modelYears = append(modelYears, modelYear)
	}
	return modelYears, nil
}

func UpdateMotorhomeModelYear(db *sql.DB, modelYear *MotorhomeModelYear) error {
	stmt, err := db.Prepare("UPDATE motorhome_model_years SET model_id = ?, year = ? WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(modelYear.ModelID, modelYear.Year, modelYear.ID)
	return err
}

func DeleteMotorhomeModelYear(db *sql.DB, id int) error {
	stmt, err := db.Prepare("DELETE FROM motorhome_model_years WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id)
	return err
}

func CreateMotorhomeFloorplan(db *sql.DB, floorplan *MotorhomeFloorplan) error {
	stmt, err := db.Prepare("INSERT INTO motorhome_floorplans (model_id, name, description, image_url) VALUES (?, ?, ?, ?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(floorplan.ModelID, floorplan.Name, floorplan.Description, floorplan.ImageURL)
	return err
}

func ReadMotorhomeFloorplans(db *sql.DB) ([]MotorhomeFloorplan, error) {
	stmt, err := db.Prepare("SELECT * FROM motorhome_floorplans")
	if err != nil {
		return nil, err
	}
	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	defer rows.Close()	

	var floorplans []MotorhomeFloorplan
	for rows.Next() {
		var floorplan MotorhomeFloorplan
		err = rows.Scan(&floorplan.ID, &floorplan.ModelID, &floorplan.Name, &floorplan.Description, &floorplan.ImageURL)
		if err != nil {
			return nil, err
		}
		floorplans = append(floorplans, floorplan)
	}
	return floorplans, nil
}

func UpdateMotorhomeFloorplan(db *sql.DB, floorplan *MotorhomeFloorplan) error {
	stmt, err := db.Prepare("UPDATE motorhome_floorplans SET model_id = ?, name = ?, description = ?, image_url = ? WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(floorplan.ModelID, floorplan.Name, floorplan.Description, floorplan.ImageURL, floorplan.ID)
	return err
}

func DeleteMotorhomeFloorplan(db *sql.DB, id int) error {
	stmt, err := db.Prepare("DELETE FROM motorhome_floorplans WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id)
	return err
}

func CreateFloorplanDevices(db *sql.DB, floorplanDevice *FloorplanDevices) error {
	stmt, err := db.Prepare("INSERT INTO motorhome_floorplan_devices (floorplan_id, device_id) VALUES (?, ?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(floorplanDevice.FloorplanID, floorplanDevice.DeviceID)
	return err
}

func ReadFloorplanDevices(db *sql.DB) ([]FloorplanDevices, error) {
	stmt, err := db.Prepare("SELECT * FROM motorhome_floorplan_devices")
	if err != nil {
		return nil, err
	}
	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var floorplanDevices []FloorplanDevices
	for rows.Next() {
		var floorplanDevice FloorplanDevices
		err = rows.Scan(&floorplanDevice.ID, &floorplanDevice.FloorplanID, &floorplanDevice.DeviceID)
		if err != nil {
			return nil, err
		}
		floorplanDevices = append(floorplanDevices, floorplanDevice)
	}
	return floorplanDevices, nil
}

func UpdateFloorplanDevices(db *sql.DB, floorplanDevice *FloorplanDevices) error {
	stmt, err := db.Prepare("UPDATE motorhome_floorplan_devices SET floorplan_id = ?, device_id = ? WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(floorplanDevice.FloorplanID, floorplanDevice.DeviceID, floorplanDevice.ID)
	return err
}

func DeleteFloorplanDevices(db *sql.DB, id int) error {
	stmt, err := db.Prepare("DELETE FROM motorhome_floorplan_devices WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id)
	return err
}

func CreateDevice(db *sql.DB, device *Device) error {
	stmt, err := db.Prepare("INSERT INTO devices (name, description, type_id) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(device.Name, device.Description, device.TypeID)
	return err
}

func ReadDevices(db *sql.DB) ([]Device, error) {
	stmt, err := db.Prepare("SELECT * FROM devices")
	if err != nil {
		return nil, err
	}
	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	defer rows.Close()	

	var devices []Device
	for rows.Next() {
		var device Device
		err = rows.Scan(&device.ID, &device.Name, &device.Description, &device.TypeID)
		if err != nil {
			return nil, err
		}
		devices = append(devices, device)
	}
	return devices, nil
}

func UpdateDevice(db *sql.DB, device *Device) error {
	stmt, err := db.Prepare("UPDATE devices SET name = ?, description = ?, type_id = ? WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(device.Name, device.Description, device.TypeID, device.ID)
	return err
}

func DeleteDevice(db *sql.DB, id int) error {
	stmt, err := db.Prepare("DELETE FROM devices WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id)
	return err
}

func CreateDeviceType(db *sql.DB, deviceType *DeviceType) error {
	stmt, err := db.Prepare("INSERT INTO device_types (name, description) VALUES (?, ?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(deviceType.Name, deviceType.Description)
	return err
}

func ReadDeviceTypes(db *sql.DB) ([]DeviceType, error) {
	stmt, err := db.Prepare("SELECT * FROM device_types")
	if err != nil {
		return nil, err
	}

	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var deviceTypes []DeviceType
	for rows.Next() {
		var deviceType DeviceType
		err = rows.Scan(&deviceType.ID, &deviceType.Name, &deviceType.Description)
		if err != nil {
			return nil, err
		}
		deviceTypes = append(deviceTypes, deviceType)
	}
	return deviceTypes, nil
}

func UpdateDeviceType(db *sql.DB, deviceType *DeviceType) error {
	stmt, err := db.Prepare("UPDATE device_types SET name = ?, description = ? WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(deviceType.Name, deviceType.Description, deviceType.ID)
	return err
}

func DeleteDeviceType(db *sql.DB, id int) error {
	stmt, err := db.Prepare("DELETE FROM device_types WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(id)
	return err
}

type MotorhomeModel struct {
	ID int
	Name string
	Description string
	ImageURL string
}

type MotorhomeModelYear struct {
	ID int
	ModelID int
	Year int
}

type MotorhomeFloorplan struct {
	ID int
	ModelID int
	Name string
	Description string
	ImageURL string
}

type FloorplanDevices struct {
	ID int
	FloorplanID int
	DeviceID int
}

type Device struct {
	ID int
	Name string
	Description string
	TypeID int
}

type DeviceType struct {
	ID int
	Name string
	Description string
}

type SystemConfig struct {
	Key string
	Value string
}

type RVCMessage struct {
	ID int
	Message string
	Timestamp time.Time
}

type Message struct {
	ID int
	PGN int
	Data string
	Timestamp time.Time
}

type NotificationsConfig struct {
	ID int
	PGN int
	Data string
	Timestamp time.Time
}


