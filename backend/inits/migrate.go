package inits

import "github.com/uxsnap/file-sharing/backend/models"

func Migrate() {
	DB.AutoMigrate(&models.User{}, &models.UserCode{})
}