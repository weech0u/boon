const Router = require('koa-router')

const router = new Router({
  prefix: '/api/v2'
})

router.post('/register', (ctx, next) => {
  ctx.body = {
    code: 200
  }
})

module.exports = router