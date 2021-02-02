/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-09-27 15:20:22
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-01 15:38:31
 */
const Router = require('koa-router')
const { Auth } = require('../../../middleware/auth')

const router = new Router({
  prefix: '/api/v2'
})

router.post('/tokenVerify',new Auth().m, (ctx) => {
  ctx.body = {
    code: 200
  }
})

module.exports = router