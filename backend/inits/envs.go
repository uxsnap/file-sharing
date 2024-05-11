package inits

import (
	"log"

	"github.com/joho/godotenv"
)


func LoadEnvVars() {
	err := godotenv.Load()
	
	if err != nil {
		log.Fatalln(err)
	}	
}