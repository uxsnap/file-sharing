package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/uxsnap/file-sharing/backend/controllers"
	"github.com/uxsnap/file-sharing/backend/inits"
	"github.com/uxsnap/file-sharing/backend/middleware"
)

func main() {
	inits.LoadEnvVars()
	inits.ConnectToDb()
	inits.Migrate()

	router := gin.Default()

	config := cors.DefaultConfig()
  config.AllowOrigins = []string{os.Getenv("CLIENT_URL")}

	router.Use(cors.New(config))
	// Auth
	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)
	router.POST("/code", controllers.Code)
	router.POST("/validate", middleware.RequireAuth, controllers.Validate)

	router.Run(":8080")
}