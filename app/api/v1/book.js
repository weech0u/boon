const Router = new require('koa-router')
const router = new Router()

router.get('/v1/book/latest', (ctx, next) => {
  console.log('a')
  ctx.body = {key: 'book'}
})

module.exports = router