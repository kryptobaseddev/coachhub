package api

import (
	"encoding/json"
	"net/http"

	"github.com/kryptobaseddev/coachhub/internal/db"
)

// HandleMessages fetches messages from the database and returns them as JSON
func HandleMessages(database *db.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        rows, err := database.Conn.Query("SELECT id, pgn, data, timestamp FROM messages")
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        defer rows.Close()

        var messages []map[string]interface{}
        for rows.Next() {
            var id int
            var pgn int
            var data string
            var timestamp string
            if err := rows.Scan(&id, &pgn, &data, &timestamp); err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }
            messages = append(messages, map[string]interface{}{
                "id":        id,
                "pgn":       pgn,
                "data":      data,
                "timestamp": timestamp,
            })
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(messages)
    }
}
