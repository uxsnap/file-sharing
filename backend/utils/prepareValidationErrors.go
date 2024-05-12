package utils

import (
	"errors"

	"github.com/go-playground/validator/v10"
)

type ErrorMsg struct {
	Field string `json:"field"`
	Message   string `json:"message"`
}

func getErrorMsg(fe validator.FieldError) string {
	switch fe.Tag() {
		case "required":
			return "This field is required"
		case "email":
			return "Email is not valid"
		case "min":
			return "The length of the field should be more than " + fe.Param()
		case "max":
			return "The length of the field should be less than " + fe.Param()
	}
	return "Unknown error"
}

func PrepareValidationErrors(err error) []ErrorMsg {
	var validationErrors validator.ValidationErrors

	if errors.As(err, &validationErrors) {
		out := make([]ErrorMsg, len(validationErrors))

		
		for ind, fe := range validationErrors {
			out[ind] = ErrorMsg{Field: fe.Field(), Message: getErrorMsg(fe) }
		}

		return out
	}

	return []ErrorMsg{};
}