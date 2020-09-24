const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})

const { Auth } = require('../../../middware/auth')

const { HttpException, ParameterException } = require('../../../core/http-exception')

router.get('/latest',new Auth(9).m, async (ctx, next) => {
  // const param = ctx.request.params
  // const query = ctx.request.query
  // const headers = ctx.request.header
  // const body = ctx.request.body
  ctx.body = {
    uid: ctx.auth.uid,
    
  }
})

module.exports = router
