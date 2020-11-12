const Router = require('koa-router')
const fs = require('fs')
const mime = require('mime-types')
const User = require('../../models/user')

const router = new Router({
  prefix: '/api/v2'
})

const baseUrl = process.cwd() + '/app/static/'

router.get('/img/:fileName', async (ctx) => {
  const {
    fileName
  } = ctx.params
  let file;
  filePath = baseUrl + fileName // 文件名拼接根目录
  try {
    file = fs.readFileSync(filePath)
  } catch (error) {
    filePath = baseUrl + '/default.png'
    file = fs.readFileSync(filePath)
  }
  const mimeType = mime.lookup(baseUrl + file) // 自动判断文件类型
  ctx.set('content-type', mimeType)
  ctx.body = file
})

module.exports = router