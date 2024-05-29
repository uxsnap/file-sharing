package models

import "gorm.io/gorm"

type User struct {
  gorm.Model
	Email     string `gorm:"unique"`
  Name      string `gorm:"unique"`
  Password  string
  IsActive  bool
  UserCode  UserCode
}
