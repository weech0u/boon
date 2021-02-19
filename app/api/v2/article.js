const Router = require('koa-router')
const {
  Article
} = require('../../models/article')
const {
  User
} = require('../../models/user')
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
  // 页码
  const query = ctx.request.query
  const pageNum = query.pageNum ? query.pageNum : 1
  const type = query.type
  const conditions = {}
  if (type && type !== 'all') {
    conditions.tags = Article.tagMap[type]
  }
  let order = ['id', 'DESC']
  if (con === 1) {
    order = ['updatedAt', 'DESC']
  } else if (con === 2) {
    order = ['commentsCount', 'DESC']
  }
  let limit = 10,
    offset = (pageNum - 1) * limit
  const articles = await Article.findAndCountAll({
    limit,
    offset,
    include: ['Comments', 'User', 'Love'],
    order: [
      order
    ],
    where: conditions,
    // 会排除include中的关联表
    distinct: true
  })
  const data = []
  articles.rows.forEach(async (item) => {
    // 时间戳处理
    item = item.toJSON()
    const format = item.updatedAt ? moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') : moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss')
    // 获取评论数
    try {
      item.commentsCount = item.Comments.length
      item.avatar = item.User.avatar
      item.howLongAgo = howLongAgo(format)
      item.Love = item.Love.map(item => item.state == 1 && item.uId)

      data.push(item)

    } catch (error) {
      ctx.body = {
        code: 400,
        msg: `${error}`
      }
    }
  })
  return {
    code: 200,
    limit,
    offset,
    total: articles.count,
    data
  }
}

router.get('/', async (ctx) => {
  const data = await getAllArticle(0, ctx)
  ctx.body = data
})

router.get('/latest', async (ctx, b) => {
  const data = await getAllArticle(1, ctx)
  ctx.body = data
})

router.get('/hotest', async ctx => {
  const data = await getAllArticle(2, ctx)
  ctx.body = data
})

// 今日热议
router.get('/hotDiscussion', async (ctx) => {
  const articles = await Article.findAll({
    limit: 5,
    order: ['CommentsCount'],
    include: ['User'],
    raw: true
  })
  const data = []
  articles.forEach(item => {
    let _item = {}
    _item.title = item.title
    _item.arId = item.id
    _item.author = item.author
    _item.avatar = item['User.avatar']
    data.push(_item)
  })
  ctx.body = {
    code: 200,
    msg: '',
    data
  }
})

// 根据id获取指定文章
router.get('/:id', async ctx => {
  const {
    q_uid
  } = ctx.request.query
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
    },
    include: ['Collections']
  })


  const {
    avatar,
    nickname,
    level
  } = user
  const data = {
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
  const f = user.Collections.filter(item => item.arId == ctx.params.id && item.state != 0)
  if (f.length !== 0) {
    data.hasCo = 1
  }
  ctx.body = {
    code: 200,
    data
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
  }

  ctx.body = {
    code,
    msg
  }
})

module.exports = router