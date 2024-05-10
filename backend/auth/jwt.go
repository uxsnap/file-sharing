package auth

import (
	"errors"
	"log"
	"os"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type loginPayload struct {
  Email string `form:"email" json:"email" binding:"required"`
  Password string `form:"password" json:"password" binding:"required"`
}

var identityKey = "id"

// User demo
type User struct {
  Email  string
}

func newJwtMiddleware() (*jwt.GinJWTMiddleware, error) {
	err := godotenv.Load()
  if err != nil {
		return nil, errors.New("error loading .env file")
  }

	secretKey := os.Getenv("SECRET_KEY")

  return jwt.New(&jwt.GinJWTMiddleware{
    Realm:       "file_sharing",
    Key:         []byte(secretKey),
    MaxRefresh:  time.Hour,
    IdentityKey: identityKey,

    PayloadFunc: func(data interface{}) jwt.MapClaims {
      if v, ok := data.(*User); ok {
        return jwt.MapClaims{
          identityKey: v.Email,
        }
      }
      return jwt.MapClaims{}
    },

    IdentityHandler: func(c *gin.Context) interface{} {
      claims := jwt.ExtractClaims(c)

      return &User{
        Email: claims[identityKey].(string),
      }
    },
    
    Authenticator: func(c *gin.Context) (interface{}, error) {
      var loginValues loginPayload

      if err := c.ShouldBind(&loginValues); err != nil {
        return "", jwt.ErrMissingLoginValues
      }

      userEmail := loginValues.Email

      return &User{
        Email: userEmail,
      }, jwt.ErrFailedAuthentication
    },
    
    Authorizator: func(data interface{}, c *gin.Context) bool {
      if _, ok := data.(*User); ok {
        return true
      }

      return false
    },
    
    Unauthorized: func(c *gin.Context, code int, message string) {
      c.JSON(code, gin.H{
        "code":    code,
        "message": message,
      })
    },
    TimeFunc: time.Now,
  })
}

func ApplyJWTMiddleware() (*jwt.GinJWTMiddleware, error) {
  authMiddleware, err := newJwtMiddleware()

	if err != nil {
		log.Fatal(err)
	}

  errInit := authMiddleware.MiddlewareInit()

  if errInit != nil {
    return nil, errors.New("authMiddleware.MiddlewareInit() Error:" + errInit.Error())
  }

  return authMiddleware, nil
}