/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-04 15:58:05
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-25 16:34:34
 */
const {
  Collections
} = require('../../models/collections')
const {
  Follow
} = require('../../models/follow')
const {
  Article
} = require('../../models/article')
const {
  Auth
} = require('../../../middleware/auth')

const Router = require('koa-router')
const {
  Sequelize
} = require('sequelize')
const {
  User
} = require('../../models/user')
const router = new Router({
  prefix: '/api/v2/collections'
})
const Op = Sequelize.Op

router.post('/add', async (ctx) => {
  const {
    uId,
    arId
  } = ctx.request.body
  const collectionObj = {
    uId,
    arId
  }
  await Collections.findOne({
      where: collectionObj
    })
    .then(res => {
      if (!res) {
        Collections.create(collectionObj)
      } else {
        res.update({
          state: 1
        })
      }
    })
  ctx.body = {
    code: 200,
  }
})

router.post('/remove', async (ctx) => {
  const {
    uId,
    arId
  } = ctx.request.body
  const collectionObj = {
    uId,
    arId
  }
  await Collections.findOne({
      where: collectionObj
    })
    .then(res => {
      if (res) {
        res.update({
          state: 0
        })
      }
    })
    .catch(error => {
      ctx.body = {
        code: 1005,
        msg: error
      }
    })
  ctx.body = {
    code: 200
  }
})

router.get('/', new Auth().m, async (ctx) => {
  const {
    type
  } = ctx.request.query
  const conditions = []
  let where
  if (type === 'themex') {
    const collections = await Collections.findAll({
      where: {
        uId: ctx.auth.uid,
        state: 1
      },
      raw: true
    })
    where = {
      id: {
        [Op.in]: conditions
      }
    }
    collections.forEach(item => {
      conditions.push(item.arId)
    })
  } else if (type === 'following') {
    const tos = await Follow.findAll({
      where: {
        uId: ctx.auth.uid
      },
      attributes: ['to'],
      raw: true
    })
    tos.forEach(item => {
      conditions.push(item.to)
    })
    where = {
      uId: {
        [Op.in]: conditions
      }
    }
  }
  const articles = await Article.findAll({
    where,
    include: ['User', 'Love'],
    raw: true
  })
  const data = []
  articles.forEach(item => {
    item.avatar = item['User.avatar']
    if (item['Love.uId'] === ctx.auth.uid && item['Love.state'] === 1) {
      item.loveState = 1
    }
    data.push(item)
  })
  ctx.body = {
    code: 200,
    data
  }
})

module.exports = router