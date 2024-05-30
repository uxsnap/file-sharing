package models

type UserCode struct {
  ID        uint   `gorm:"primarykey"`
  Code      string
  UserID    uint
	Email     string
}
