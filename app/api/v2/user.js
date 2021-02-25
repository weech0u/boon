/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-09-25 11:26:09
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-22 15:14:00
 */
const Router = require('koa-router')
const {
  User
} = require('../../models/user')
const {
  HttpException
} = require('../../../core/http-exception')
const bcrypt = require('bcryptjs')
const {
  Auth
} = require('../../../middleware/auth')
const {
  generateToken,
  generateDateFormat
} = require('../../../core/util')
const {
  Sequelize
} = require('sequelize')
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
      [Op.or]: [{
          nickname: data.username
        },
        {
          email: data.username
        }
      ]
    },
    include: ['Collections', 'Follow']
  })
  if (!user) {
    throw new HttpException('用户不存在', 1000)
  }
  // 比较从前端获取的密码 和 解码后的数据库密码
  const correct = bcrypt.compareSync(data.password, user.password)
  if (!correct) {
    throw new HttpException('密码错误', 1001)
  }
  if (user.level === 0) {
    throw new HttpException('用户未激活', 1002)
  }
  const token = generateToken(user.id, Auth.USER)
  const loginTime = generateDateFormat().date
  user.updatedAt = loginTime
  user.save()
  ctx.body = {
    code: 200,
    msg: '登录成功',
    token,
    avatarUrl: user.avatar,
    userInfo: {
      id: user.id,
      uId: user.uId,
      nickname: user.nickname,
      email: user.email,
      loginTime,
      level: user.level,
      clc: user.Collections.length,
      foc: user.Follow.length
    }
  }
})

router.get('/atcount', async ctx => {
  const {
    uId
  } = ctx.request.query
  const user = await User.findOne({
    where: {
      id: uId
    },
    include: ['Collections']
  })
  const data = {
    clc: user.Collections.filter(item => item.state != 0).length
  }
  ctx.body = {
    code: 200,
    data
  }
})

router.get('/focount', async (ctx) => {
  const {
    uId
  } = ctx.request.query
  const user = await User.findOne({
    where: {
      id: uId
    },
    include: ['Follow']
  })
  const data = {
    foc: user.Follow.length
  }
  ctx.body = {
    code: 200,
    data
  }
})

router.get('/refresh', async ctx => {
  const data = ctx.request.query
  const id = data.id
  await User.findOne({
      where: {
        id
      }
    })
    .then(res => {
      ctx.body = {
        avatarUrl: res.avatar
      }
    })
    .catch(error => {
      throw new HttpException('修改失败', 1003)
    })
})

module.exports = router