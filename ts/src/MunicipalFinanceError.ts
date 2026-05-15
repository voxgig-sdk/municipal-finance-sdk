
import { Context } from './Context'


class MunicipalFinanceError extends Error {

  isMunicipalFinanceError = true

  sdk = 'MunicipalFinance'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MunicipalFinanceError
}

