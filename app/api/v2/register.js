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

const { generateDateFormat } = require('../../../core/util')

router.post('/register', async (ctx, next) => {
  console.log('a')
  const data = ctx.request.body
  const {
    email
  } = data

  await User.checkOccupied(email)

  const user = {
    email,
    password: data.password,
    nickname: uuidv4().slice(0, 2),
    key: uuidv4().slice(0, 6),
    lastLoginTime: generateDateFormat().date
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

module.exports = router