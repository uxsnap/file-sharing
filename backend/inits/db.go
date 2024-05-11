package inits

import (
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDb() *gorm.DB {
	url := os.Getenv("POSTGRESQL_URL");
	
	var err error
	DB, err = gorm.Open(postgres.Open(url), &gorm.Config{})

	if err != nil {
		panic("cannot connect to db")
	}

	return DB
}
