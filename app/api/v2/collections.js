/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-04 15:58:05
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-08 20:12:02
 */
const {
  Collections
} = require('../../models/collections')

const Router = require('koa-router')
const router = new Router({
  prefix: '/api/v2/collections'
})

router.post('/add', async (ctx) => {
  const {
    uId,
    arId
  } = ctx.request.body
  const collectionObj = {
    uId,
    arId
  }
  await Collections.findOne({
    where: collectionObj
  })
  .then(res => {
    if(!res){
      Collections.create(collectionObj)
    }else {
      res.update({
        state: 1
      })
    }
  })
  ctx.body = {
    code: 200,
  }
})

router.post('/remove', async (ctx) => {
  const {
    uId,
    arId
  } = ctx.request.body
  const collectionObj = {
    uId,
    arId
  }
  await Collections.findOne({
    where: collectionObj
  })
  .then(res => {
    if(res) {
      res.update({
        state: 0
      })
    }
  })
  .catch(error => {
    ctx.body = {
      code: 1005,
      msg: error
    }
  })
  ctx.body = {
    code: 200
  }
})

router.get('/', async (ctx) => {
  const collections = await Collections.findAll({
    raw: true
  })
  const data = collections
  ctx.body = {
    code: 200,
    data
  }
})

module.exports = router