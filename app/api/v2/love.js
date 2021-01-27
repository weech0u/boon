const Router = require('koa-router')
const {
  Love
} = require('../../models/love')
const {
  User
} = require('../../models/user')
const {
  Article
} = require('../../models/article')
const {
  sequelize
} = require('../../../core/db')
const {
  Sequelize
} = require('sequelize')

const router = new Router({
  prefix: '/api/v2'
})

router.post('/like', async (ctx) => {
  const {
    arId,
    uId,
    state
  } = ctx.request.body

  // 更新点赞数
  const n = state === 0 ? -1 : 1
  await Article.update({
    niceCount: Sequelize.literal('`niceCount` + ' + n)
  }, {
    where: {
      id: arId
    },
    silent: true
  })

  await Love.findOne({
    where: {
      arId,
      uId
    }
  }).then(res => {
    if (res&&res.dataValues) {
      res.update({
        state
      })
    } else {
      // 创建点赞数据
      const love = {
        arId,
        uId
      }
      Love.create(love)
    }
  })

  ctx.body = {
    code: 200
  }
})

module.exports = router