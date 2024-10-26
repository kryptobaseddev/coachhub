package api

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/kryptobaseddev/coachhub/internal/db"
)

func HandleSystemConfigs(database *db.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			getSystemConfigs(w, r, database)
		case http.MethodPost:
			updateSystemConfig(w, r, database)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	}
}

func getSystemConfigs(w http.ResponseWriter, r *http.Request, database *db.DB) {
	rows, err := database.Conn.Query("SELECT key, value FROM system_configs")
	if err != nil {
		log.Printf("Error querying database: %v", err)
		http.Error(w, "Failed to fetch system configs", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	configs, err := rowsToJSON(rows)
	if err != nil {
		log.Printf("Error processing system configs: %v", err)
		http.Error(w, "Failed to process system configs", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(configs)
}

func updateSystemConfig(w http.ResponseWriter, r *http.Request, database *db.DB) {
	var config struct {
		Key   string `json:"key"`
		Value string `json:"value"`
	}

	if err := json.NewDecoder(r.Body).Decode(&config); err != nil {
		log.Printf("Error decoding request body: %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	_, err := database.Conn.Exec("INSERT OR REPLACE INTO system_configs (key, value) VALUES (?, ?)", config.Key, config.Value)
	if err != nil {
		log.Printf("Error updating system config: %v", err)
		http.Error(w, "Failed to update system config", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "System config updated successfully"})
}

func rowsToJSON(rows *sql.Rows) ([]map[string]interface{}, error) {
	var items []map[string]interface{}
	columns, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		item := make(map[string]interface{})
		values := make([]interface{}, len(columns))
		valuePtrs := make([]interface{}, len(columns))

		for i := range columns {
			valuePtrs[i] = &values[i]
		}

		if err := rows.Scan(valuePtrs...); err != nil {
			log.Printf("Error scanning rows: %v", err)
			return nil, err
		}

		for i, col := range columns {
			val := values[i]
			b, ok := val.([]byte)
			if ok {
				item[col] = string(b)
			} else {
				item[col] = val
			}
		}

		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Error in rows: %v", err)
		return nil, err
	}

	return items, nil
}
