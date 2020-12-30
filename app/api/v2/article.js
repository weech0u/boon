const Router = require('koa-router')
const {
  Article
} = require('../../models/article')
const {
  User
} = require('../../models/user')
const {
  generateIdByDate
} = require('../../../core/util')

const router = new Router({
  prefix: '/api/v2'
})
const moment = require('moment')

// 获取所有文章, 分页10
router.get('/article', async (ctx) => {
  const articles = await Article.findAll({
    limit: 10
  })
  articles.map(item => {
    const tempTime = moment(item.dataValues.updatedAt)
    item.dataValues.updatedAt = moment().isSame(tempTime,'d')?moment(tempTime).format('h:mm'):moment(tempTime).format('M-D')
    return item
  })
  ctx.body = {
    code: 200,
    data: articles
  }
})

// 根据id获取指定文章
router.get('/article/:id', async (ctx) => {
  const article = await Article.findOne({
    where: {
      uId: ctx.params.id
    }
  })
  console.log(ctx.params.id)
  const {
    uId
  } = article
  const {
    avatar,
    nickname,
    level
  } = await User.findOne({
    where: {
      id: uId
    }
  })
  ctx.body = {
    code: 200,
    title: article.title,
    author: {
      nickname,
      level,
      avatar
    },
    content: article.content,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  }
})

// 创建
router.post('/article/new', async (ctx) => {
  let code = 200,
    msg = 'success';
  const {
    title,
    author,
    content,
    uId
  } = ctx.request.body
  console.log(ctx.request.body)

  try {
    await Article.create({
      arId: generateIdByDate(),
      title,
      author,
      content,
      uId
    })
  } catch (error) {
    code = 400
    msg = '发生异常'
    console.log(error)
  }

  ctx.body = {
    code,
    msg
  }
})

module.exports = router