/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-20 11:10:14
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-24 09:51:01
 */
const Router = require('koa-router')
const {
  Auth
} = require('../../../middleware/auth')
const {
  User
} = require('../../models/user')
const {
  Follow
} = require('../../models/follow')

const router = new Router({
  prefix: '/api/v2/follow'
})

router.post('/', new Auth().m, async (ctx) => {
  const {
    to
  } = ctx.request.body
  const user = await User.findOne({
    where: {
      id: ctx.auth.uid
    },
    include: ['Follow']
  })
  const to_user = await User.findOne({
    where: {
      id: to
    }
  })
  if (user.Follow.length === 0) {
    await Follow.create({
      uId: ctx.auth.uid,
      to,
      to_nickname: to_user.nickname,
      to_avatar: to_user.avatar
    })
  } else {
    await Follow.destroy({
      where: {
        uId: ctx.auth.uid,
        to
      }
    })
  }
  ctx.body = {
    code: 200
  }
})

router.get('/', new Auth().m, async (ctx) => {
  const followList = await Follow.findAll({
    where: {
      uId: ctx.auth.uid
    },
  })

  ctx.body = {
    code: 200,
    data: followList
  }
})

module.exports = router