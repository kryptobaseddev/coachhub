package api

import (
	"database/sql"
	"net/http"

	"github.com/kryptobaseddev/coachhub/internal/db"
)

func HandleNotificationsConfig(database *db.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, "Not implemented", http.StatusNotImplemented)
	}
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
		return nil, err
	}

	return items, nil
}


