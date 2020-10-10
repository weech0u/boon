const Router = require('koa-router')
const {
  User
} = require('../../models/user')
const {
  v4: uuidv4
} = require('uuid')
const {
  Auth
} = require('../../../middware/auth')
const {
  sendEmail
} = require('../../../core/email')

const router = new Router({
  prefix: '/api/v2'
})

const {
  HttpException
} = require("../../../core/http-exception")

router.post('/register', checkEmail, async (ctx, next) => {
  const data = ctx.request.body
  const {
    email
  } = data

  const user = {
    email,
    password: data.password,
    nickname: uuidv4().slice(0, 2),
    key: uuidv4().slice(0, 6)
  }

  const res = await User.create(user)

  sendEmail(email, `
  <h1>激活地址:</h1>
  http://localhost:3000/register/activate?key=${res.getDataValue('key')}
  `)

  ctx.body = {
    code: 200,
    email
  }
})

async function checkEmail(ctx, next) {
  const data = ctx.request.body
  const {
    email
  } = data
  await User.findOne({
    raw: true,
    where: {
      email
    }
  }).then(res => {
    if (res) {
      throw new HttpException('邮箱已被注册', 405)
    }
  })
}

module.exports = router