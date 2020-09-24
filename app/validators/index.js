const Joi = require('joi')
const {
  HttpException
} = require('../../core/http-exception')

const TokenSchema = Joi.object({
  account: Joi.string(),
  secret: Joi.string().min(2).max(10).error(new HttpException('Token没有通过验证')),
  type: Joi.number().min(200).max(300).error(new HttpException('invalid loginType error',10010))
})

function TokenValidator(val) {
  const {
    error,
    value
  } = TokenSchema.validate(val)
  return error ? error : value
}

// const LoginTypeValidator = {

// }

module.exports = {
  TokenValidator
}