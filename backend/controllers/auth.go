package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/uxsnap/file-sharing/backend/inits"
	"github.com/uxsnap/file-sharing/backend/models"
	"github.com/uxsnap/file-sharing/backend/utils"
	"golang.org/x/crypto/bcrypt"
)

type authBody struct {
	Email string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8,max=128"`
}

type registerBody struct {
	authBody
	Name string `json:"name" binding:"required,alphanum,min=5,max=128"`
}

func Register(c *gin.Context) {
	var body registerBody

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": utils.PrepareValidationErrors(err),
		})

		return
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to hash password",
		})

		return
	}

	user := models.User{
		Email: body.Email,
		Name: body.Name,
		Password: string(hashedPass),
	}

	result := inits.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create user",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {
	var body authBody

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid body",
		})

		return
	}

	var user models.User
	inits.DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid email or password",
		})

		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "passwords don't match",
		})

		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})
	
	tokenString, err := token.SignedString([]byte(os.Getenv("HMAC_SECRET")))
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create token",
		})

		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600 * 24 * 30, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{})
}