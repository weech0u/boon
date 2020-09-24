const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/flow'
})
const {Success} = require('../../../core/http-exception')

const { Flow } = require('../../models/flow')

router.post('/flowinit', async (ctx) => {
  for(let i = 0; i< 10; i++) {
    await Flow.create({
      index: Math.floor(Math.random()*10).toString(),
      status: Math.floor(Math.random()*100)+200
    })
  }
  throw new Success()
})

router.get('/latest', async (ctx) => {
  const flows = await Flow.findAll({
    order: [
      ['index', 'DESC']
    ]
  })
  ctx.body = flows
})

module.exports = router