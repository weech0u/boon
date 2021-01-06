const Router = require('koa-router')
const {
  Article
} = require('../../models/article')
const {
  User
} = require('../../models/user')
const {
  Comment
} = require('../../models/comment')
const {
  generateIdByDate
} = require('../../../core/util')

const router = new Router({
  prefix: '/api/v2/article'
})
const moment = require('moment')

// 获取所有文章, 分页10
router.get('/', async (ctx) => {
  const articles = await Article.findAll({
    limit: 10,
    include: ['Comments']
  })
  articles.forEach(async (item) => {
    // 时间戳处理
    const tempTime = moment(item.dataValues.updatedAt)
    item.dataValues.updatedAt = moment().isSame(tempTime, 'd') ? moment(tempTime).format('h:mm') : moment(tempTime).format('Y-M-D')
    // 获取评论数
    try {
      item.dataValues.commentsCount = item.Comments.length
      return item
    } catch (error) {
      ctx.body = {
        code: 400,
        msg: `${error}`
      }
    }
    return item
  })
  ctx.body = {
    code: 200,
    data: articles
  }
})

// 根据id获取指定文章
router.get('/:id', async (ctx) => {
  const article = await Article.findOne({
    where: {
      id: ctx.params.id
    }
  })
  const {
    uId
  } = article

  const user = await User.findOne({
    where: {
      id: uId
    }
  })

  const {
    avatar,
    nickname,
    level
  } = user
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
router.post('/new', async (ctx) => {
  let code = 200,
    msg = 'success';
  const {
    title,
    author,
    content,
    id,
    selectTheme
  } = ctx.request.body

  try {
    await Article.create({
      arId: generateIdByDate(),
      title,
      author,
      content,
      uId: id,
      tags: selectTheme
    })
  } catch (error) {
    code = 400
    msg = 'error'
    console.log(error)
  }

  ctx.body = {
    code,
    msg
  }
})

module.exports = router