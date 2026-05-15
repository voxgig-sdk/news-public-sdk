package core

type NewsPublicError struct {
	IsNewsPublicError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewNewsPublicError(code string, msg string, ctx *Context) *NewsPublicError {
	return &NewsPublicError{
		IsNewsPublicError: true,
		Sdk:              "NewsPublic",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *NewsPublicError) Error() string {
	return e.Msg
}
