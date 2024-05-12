package main

import (
	"github.com/gin-gonic/gin"
	"github.com/uxsnap/file-sharing/backend/controllers"
	"github.com/uxsnap/file-sharing/backend/inits"
)

func main() {
	inits.LoadEnvVars()
	inits.ConnectToDb()
	inits.Migrate()

	router := gin.Default()

	// Auth
	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)

	router.Run(":8080")
}