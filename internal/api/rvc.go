package api

import (
	"encoding/json"
	"net/http"

	"github.com/kryptobaseddev/coachhub/internal/db"
	"github.com/kryptobaseddev/coachhub/internal/rvc"
)

// HandleRVC handles RVC-related API requests
func HandleRVC(database *db.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			handleGetRVCData(w, r, database)
		case http.MethodPost:
			handlePostRVCMessage(w, r, database)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	}
}

func handleGetRVCData(w http.ResponseWriter, r *http.Request, database *db.DB) {
	// TODO: Implement fetching RVC data from the database
	rows, err := database.Conn.Query("SELECT id, message, timestamp FROM rvc_messages")
	if err != nil {
		http.Error(w, "Failed to fetch RVC messages", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// This is a placeholder implementation
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "RVC data retrieval not implemented yet"})
}

func handlePostRVCMessage(w http.ResponseWriter, r *http.Request, database *db.DB) {
	var message rvc.Message
	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = db.SaveRVCMessage(database.Conn, &message)
	if err != nil {
		http.Error(w, "Failed to save RVC message", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "RVC message saved successfully"})
}
