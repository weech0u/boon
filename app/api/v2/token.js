const Router = require('koa-router')
const { Auth } = require('../../../middware/auth')

const router = new Router({
  prefix: '/api/v2'
})

router.post('/tokenVerify',new Auth().m, (ctx) => {
  ctx.body = {
    code: 200
  }
})

module.exports = router