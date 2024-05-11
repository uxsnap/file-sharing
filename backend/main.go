package main

import (
	"github.com/gin-gonic/gin"
	"github.com/uxsnap/file-sharing/backend/inits"
)

func main() {
	inits.LoadEnvVars()
	inits.ConnectToDb()

	router := gin.Default()

	router.Run(":8080")
}