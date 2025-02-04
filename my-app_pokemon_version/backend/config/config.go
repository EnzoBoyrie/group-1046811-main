package config

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	var err error
	start := "root:311201@tcp(localhost:3306)/Pokestore"
	DB, err = sql.Open("mysql", start)
	if err != nil {
		log.Fatal(err, "Erreur de l'ouverture de la database")
	}

	if err = DB.Ping(); err != nil {
		log.Fatal(err, "Erreur de ping à la database")
	}
	log.Println("Database connectée avec succès")
}
