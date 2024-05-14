package models

import "gorm.io/gorm"

type UserCode struct {
  gorm.Model
  Code string
	UserID uint
}
