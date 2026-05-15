
import { Context } from './Context'


class NewsPublicError extends Error {

  isNewsPublicError = true

  sdk = 'NewsPublic'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  NewsPublicError
}

