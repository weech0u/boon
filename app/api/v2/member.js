/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-03 16:10:55
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-20 15:02:14
 */
const Router = require('koa-router')
const {
  User
} = require('../../models/user')
const {
  Auth
} = require('../../../middleware/auth')
const router = new Router({
  prefix: '/api/v2'
})
const moment = require('moment')
const {
  Follow
} = require('../../models/follow')

router.get('/member/:nickname', async (ctx) => {
  const {
    nickname,
  } = ctx.params
  const user = await User.findOne({
    where: {
      nickname
    }
  })
  const memberInfo = {
    id: user.id,
    nickname: user.nickname,
    avatar: user.avatar,
    createdAt: moment(user.createdAt).format('yyyy-MM-DD HH:mm:ss')
  }
  await Follow.findOne({
      where: {
        uId: ctx.request.query.uId,
        to: user.id
      }
    })
    .then(res => {
      if (res) {
        memberInfo.following = 1
      }
    })
  ctx.body = {
    code: 200,
    memberInfo
  }
})

module.exports = router