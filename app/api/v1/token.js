const Router = require('koa-router')
const { TokenValidator } = require('../../validators')
const { LoginType } = require('../../lib/ecode')
const { User } = require('../../models/user')
const { HttpException } = require('../../../core/http-exception')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middware/auth')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx) => {
  const data = ctx.request.body
  if (TokenValidator(data) instanceof Error) {
    throw new TokenValidator(data)
  } 
  let token
  switch (data.type) {
    case LoginType.USER_EMAIL:
      try {
        const account = data.account
        const secret = data.secret
        token = await emailLogin(account, secret)
      } catch (error) {
        console.log(error)
      }
      break
    // case LoginType.USER_MOBILE:
    //   break
    // case LoginType.ADMIN_EMAIL:
    //   break
    default:
      throw new HttpException('没有相应的异常处理方法')
  }
  ctx.body = {
    code: 200,
    msg: 'back token',
    token
  }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, Auth.USER)
}

module.exports = router