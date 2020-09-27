const Router = require('koa-router')
const {User} = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middware/auth')

const router = new Router({
  prefix: '/api/v2'
})

router.post('/activate', async (ctx) => {
  const data = ctx.request.body
  const key = data.key
  await User.findOne({
    where: {
      key
    }
  })
  .then(res=> {
    res.update({
      level: 1
    })

    const token = generateToken(res.getDataValue('id'), Auth.USER)
    
    ctx.body = {
      code:200,
      msg: '激活成功',
      token
    }
  })
})

module.exports = router