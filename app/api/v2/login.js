const Router = require('koa-router')
const { User } = require('../../models/user')
const { HttpException } = require('../../../core/http-exception')
const bcrypt = require('bcryptjs')
const { Auth } = require('../../../middware/auth')
const { 
  generateToken,
  generateDateFormat 
} = require('../../../core/util')
const { Sequelize } = require('sequelize')
const monent = require('moment')
const Op = Sequelize.Op

// 设置时区
monent.locale('zh-cn')

const router = new Router({
  prefix: '/api/v2/user'
})

router.post('/loginVerify', async (ctx, next) => {
  const data = ctx.request.body
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { nickname: data.username },
        { email: data.username }
      ]
    }
  })
  if (!user) {
    throw new HttpException('用户不存在',401)
  }
  // 比较从前端获取的密码 和 解码后的数据库密码
  const correct = bcrypt.compareSync(data.password, user.password)
  if (!correct) {
    throw new HttpException('密码错误', 402)
  }
  if (user.level === 0) {
    throw new HttpException('用户未激活', 403)
  }
  const token = generateToken(user.id, Auth.USER)
  const loginTime = generateDateFormat().date
  user.updatedAt = loginTime
  user.save()

  ctx.body = {
    code: 200,
    msg: '登录成功',
    token: token,
    userInfo: {
      nickname: user.nickname,
      email: user.email,
      loginTime,
      level: user.level
    }
  }
})

module.exports = router