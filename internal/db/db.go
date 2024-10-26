package db

import (
	"database/sql"
)

// Rename the struct to avoid redeclaration
type Database struct {
	Conn *sql.DB
}

// Close closes the database connection
func (db *Database) Close() error {
	return db.Conn.Close()
}

// Query executes a query that returns rows
func (db *Database) Query(query string, args ...interface{}) (*sql.Rows, error) {
	return db.Conn.Query(query, args...)
}

// Exec executes a query without returning any rows
func (db *Database) Exec(query string, args ...interface{}) (sql.Result, error) {
	return db.Conn.Exec(query, args...)
}

// QueryRow executes a query that is expected to return at most one row
func (db *Database) QueryRow(query string, args ...interface{}) *sql.Row {
	return db.Conn.QueryRow(query, args...)
}