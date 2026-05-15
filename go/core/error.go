package core

type MunicipalFinanceError struct {
	IsMunicipalFinanceError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMunicipalFinanceError(code string, msg string, ctx *Context) *MunicipalFinanceError {
	return &MunicipalFinanceError{
		IsMunicipalFinanceError: true,
		Sdk:              "MunicipalFinance",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MunicipalFinanceError) Error() string {
	return e.Msg
}
