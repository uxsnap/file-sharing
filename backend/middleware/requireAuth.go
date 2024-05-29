package middleware

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/uxsnap/file-sharing/backend/inits"
	"github.com/uxsnap/file-sharing/backend/models"
)

type tokenBody struct {
	Token string
}

func RequireAuth(c *gin.Context) {
	var body tokenBody

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid token body",
		})

		return
	}

	token, err := jwt.Parse(body.Token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		return []byte(os.Getenv("HMAC_SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && err == nil {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		var user models.User
		inits.DB.First(&user, claims["sub"])

		if user.ID == 0 || !user.IsActive {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		c.Set("userID", user.ID)
		c.Next()
		return 
	}

	c.AbortWithStatus(http.StatusUnauthorized)
}