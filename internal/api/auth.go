package api

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4" // JWT for token-based authentication
)

type Credentials struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

var jwtKey = []byte("your_secret_key")

type Claims struct {
    Username string `json:"username"`
    jwt.StandardClaims
}

func LoginHandler(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var creds Credentials
        if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
            log.Printf("Error decoding request payload: %v", err)
            http.Error(w, "Invalid request payload", http.StatusBadRequest)
            return
        }

        // Check user credentials against the database
        var storedPassword string
        err := db.QueryRow("SELECT password FROM users WHERE username = ?", creds.Username).Scan(&storedPassword)
        if err != nil {
            log.Printf("Error querying database: %v", err)
            http.Error(w, "Invalid credentials", http.StatusUnauthorized)
            return
        }
        if storedPassword != creds.Password {
            log.Printf("Invalid password for user: %s", creds.Username)
            http.Error(w, "Invalid credentials", http.StatusUnauthorized)
            return
        }

        // Generate JWT token
        expirationTime := time.Now().Add(24 * time.Hour)
        claims := &Claims{
            Username: creds.Username,
            StandardClaims: jwt.StandardClaims{
                ExpiresAt: expirationTime.Unix(),
            },
        }

        token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
        tokenString, err := token.SignedString(jwtKey)
        if err != nil {
            log.Printf("Error generating token: %v", err)
            http.Error(w, "Error generating token", http.StatusInternalServerError)
            return
        }

        http.SetCookie(w, &http.Cookie{
            Name:     "token",
            Value:    tokenString,
            Expires:  expirationTime,
            HttpOnly: true,
        })

        log.Printf("Login successful for user: %s", creds.Username)
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("Login successful"))
    }
}
