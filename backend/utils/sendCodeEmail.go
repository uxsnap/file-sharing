package utils

import (
	"fmt"
	"net/smtp"
	"os"
)

func SendCodeEmail(mailTo string, code string) error {
	host := os.Getenv("MAIL_HOST")
	port := os.Getenv("MAIL_PORT")
	pass := os.Getenv("MAIL_PASSWORD")
	appName :=fmt.Sprintf("%v@example.com", os.Getenv("APP_NAME"))

	auth := smtp.PlainAuth(
		"",
		appName,
		pass,
		host,
	)

	msg := fmt.Sprintf("Subject: Verification Code\nYour code: %v", code)

	err := smtp.SendMail(
		fmt.Sprintf("%v:%v", host, port),
		auth,
		appName, 
		[]string{mailTo},
		[]byte(msg),
	)	

	fmt.Println(err)
	
	return err
}