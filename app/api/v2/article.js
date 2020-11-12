const Router = require('koa-router')
const {Article} = require('../../models/article')
const {User} = require('../../models/user')

const router = new Router({
  prefix: '/api/v2'
})

router.get('/article/:id', async (ctx) => {
  const article = await Article.findOne({
    where: {
      arid: ctx.params.id
    }
  })
  const {uId} = article
  const {avatar} = await User.findOne({
    where: {
      id: uId
    }
  })
  ctx.body = {
    code: 200,
    title: article.title,
    author: article.author,
    content: article.content,
    createAt: article.createAt,
    updatedAt: article.updatedAt,
    avatar
  }
})

module.exports = router