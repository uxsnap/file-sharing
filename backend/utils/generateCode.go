package utils

import (
	"math/rand"
	"strconv"
)

func GenerateCode() string {
	return strconv.Itoa(rand.Intn(99999))
}