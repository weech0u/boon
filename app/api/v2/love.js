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

const router = new Router({
  prefix: '/api/v2'
})

router.post('/like', async (ctx) => {
  const {
    arId,
    uId,
    state
  } = ctx.request.body

  const {dataValues} = await Article.findOne({
    where: {
      arId: arId
    }
  })
  if (state === 1) {
    Article.update({
      niceCount: dataValues.niceCount + 1
    }, {
      where: {
        arId: arId
      }
    })
  } else {

  }
  ctx.body = {
    code: 200
  }
})

module.exports = router