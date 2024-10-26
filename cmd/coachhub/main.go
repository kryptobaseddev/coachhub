package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/kryptobaseddev/coachhub/internal/api"
	"github.com/kryptobaseddev/coachhub/internal/db"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// Initialize the database
	database, err := initDB()
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer database.Close()

	// Set up the HTTP server
	mux := http.NewServeMux()

	// Register API routes
	mux.HandleFunc("/api/login", api.LoginHandler(database.Conn))
	mux.HandleFunc("/api/system-configs", api.HandleSystemConfigs(database))

	// Register the login route as requested
	http.HandleFunc("/api/login", api.LoginHandler(database.Conn))

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func initDB() (*db.DB, error) {
	dbPath := os.Getenv("DATABASE_URL")
	if dbPath == "" {
		dbPath = "file:local.db"
	}

	sqlDB, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, err
	}

	if err = sqlDB.Ping(); err != nil {
		return nil, err
	}

	return &db.DB{Conn: sqlDB}, nil
}
