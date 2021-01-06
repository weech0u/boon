const Router = require('koa-router')
const {
  User
} = require('../../models/user')
const {
  generateToken,
  generateDateFormat
} = require('../../../core/util')
const {
  Auth
} = require('../../../middware/auth')

const router = new Router({
  prefix: '/api/v2'
})

router.post('/activate', async (ctx) => {
  const data = ctx.request.body
  const key = data.key
  await User.findOne({
      where: {
        key
      }
    })
    .then(res => {
      res.update({
        level: 1
      })

      const token = generateToken(res.getDataValue('id'), Auth.USER)
      const loginTime = generateDateFormat().date
      res.updatedAt = loginTime
      res.save()

      ctx.body = {
        code: 200,
        msg: '激活成功',
        token,
        userInfo: {
          id: res.id,
          uId: res.uId,
          nickname: res.nickname,
          email: res.email,
          loginTime,
          level: res.level
        }
      }
    })
})

module.exports = router