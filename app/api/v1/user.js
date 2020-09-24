const Router = require('koa-router')
const { User } = require('../../models/user')
const { Success } = require('../../../core/http-exception')
const router = new Router({
  prefix: '/v1/user'
})

const validator = require('validator')

// 注册 新增数据 put get delete
router.post('/register', async(ctx) => {
  const data = ctx.request.body

  const user = {
    email: data.email,
    password: data.password,
    nickname: data.nickname
  }

  await User.create(user)
  throw new Success()
})

module.exports = router