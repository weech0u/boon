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
  generateIdByDate,
  howLongAgo
} = require('../../../core/util')

const router = new Router({
  prefix: '/api/v2/article'
})
const moment = require('moment')

// 获取所有文章, 分页10
async function getAllArticle(con, ctx) {
  let order = ['id', 'DESC']
  if (con === 1) {
    order = ['updatedAt', 'DESC']
  }
  const articles = await Article.findAll({
    limit: 10,
    include: ['Comments', 'User'],
    order: [
      order
    ],
    // attributes: ['id', 'updatedAt']
  })
  const data = []
  articles.forEach(async (item) => {
    // 时间戳处理
    item = item.toJSON()
    // const tempTime = moment(item.dataValues.updatedAt)
    const format = item.updatedAt ? moment(item.updatedAt).format('YYYY-MM-DD hh:mm:ss') : moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss')
    // item.updatedAt = moment().isSame(tempTime, 'd') ? moment(tempTime).format('h:mm') : moment(tempTime).format('Y-M-D')
    // 获取评论数
    try {
      item.commentsCount = item.Comments.length
      item.avatar = item.User.avatar
      item.howLongAgo = howLongAgo(format)
      data.push(item)
    } catch (error) {
      ctx.body = {
        code: 400,
        msg: `${error}`
      }
    }
  })
  return data
}

router.get('/', async ctx => {
  const data = await getAllArticle(0, ctx)
  ctx.body = {
    code: 200,
    data
  }
})

router.get('/latest', async ctx => {
  const data = await getAllArticle(1, ctx)
  ctx.body = {
    code: 200,
    data
  }
})

// 根据id获取指定文章
router.get('/:id', async ctx => {
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