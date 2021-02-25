/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-24 14:05:59
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-24 15:43:14
 */
const Router = require('koa-router')
const {
  Messages
} = require('../../models/messages')
const {
  Auth
} = require('../../../middleware/auth')
const router = new Router({
  prefix: '/api/v2/message'
})
const {
  Sequelize
} = require('sequelize')
const Op = Sequelize.Op
router.get('/', async (ctx) => {
  const {
    from,
    to
  } = ctx.request.query
  const messages = await Messages.findAll({
    where: {
      [Op.or]: [
        {
          sender_uid: from,
          receiver_uid: to
        },
        {
          sender_uid: to,
          receiver_uid: from
        }
      ]
    },
    raw: true
  })
  ctx.body = {
    code: 200,
    messages
  }
})

router.post('/', async (ctx) => {
  const {
    message
  } = ctx.request.body
  const {
    sender_uid,
    receiver_uid,
    content
  } = message
  await Messages.create({
    sender_uid,
    receiver_uid,
    content
  })
  ctx.body = {
    code: 200
  }
})

module.exports = router