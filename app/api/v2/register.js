const Router = require('koa-router')
const { User } = require('../../models/user')
const { v4: uuidv4 } = require('uuid')
const { Auth } = require('../../../middware/auth')
const { sendEmail } = require('../../../core/email')

const router = new Router({
  prefix: '/api/v2'
})

router.post('/register', async (ctx, next) => {
  const data = ctx.request.body
  const user = {
    email: data.email,
    password: data.password,
    nickname: uuidv4().slice(0, 2),
    key: uuidv4().slice(0, 6)
  }

  const res = await User.create(user)

  sendEmail('361772818@qq.com', `
  <h1>激活地址:</h1>
  http://localhost:3000/activate?key=${res.getDataValue('key')}
  `)

  ctx.body = {
    code: 200,
  }
})

module.exports = router