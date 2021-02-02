/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-09-18 11:05:36
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-01 15:37:32
 */
const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})

const { Auth } = require('../../../middleware/auth')

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
