const Router = require('koa-router')
const { prefix } = require('./activate')
const {Article} = require('../../models/article')

const router = new Router({
  prefix: '/api/v2'
})

router.get('/article/:id', async (ctx) => {
  const article = await Article.findOne({
    where: {
      arid: ctx.params.id
    }
  })
  ctx.body = {
    code: 200,
    title: article.title,
    author: article.author,
    content: article.content,
    createAt: article.createAt,
    updatedAt: article.updatedAt,
  }
})

module.exports = router