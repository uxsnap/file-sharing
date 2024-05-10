package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/uxsnap/file-sharing/backend/auth"
)

func main() {
	router := gin.Default()

	/** Middleware **/
	jwtMiddleware, err := auth.ApplyJWTMiddleware()
	
	if err != nil {
		log.Fatal(err)
	}
	
	router.Use(jwtMiddleware.MiddlewareFunc())
	/** Middleware **/ 
	
	// Auth
	router.GET("/refresh_token", jwtMiddleware.RefreshHandler)
	router.POST("/login", jwtMiddleware.LoginHandler)
	router.POST("/logout", jwtMiddleware.LogoutHandler)

	router.Run()
}