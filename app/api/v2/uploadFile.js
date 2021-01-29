/*
 * @Author: zhouwei
 * @Date: 2021-01-19 13:48:42
 * @LastEditTime: 2021-01-29 17:16:41
 * @LastEditors: zhouwei
 * @Description: In User Settings Edit
 * @FilePath: /boon/app/api/v2/uploadFile.js
 */
const Router = require('koa-router')
const fs = require('fs')
const {
  User
} = require('../../models/user')
const {
  BASE_PATH,
  TEST_URL
} = require('../../../config/config')
const path = require('path')
const router = new Router({
  prefix: '/api/v2'
})

router.post('/upload', async ctx => {
  const data = ctx.request.body
  const file = ctx.request.files.file
  // 创建可读流
  const render = fs.createReadStream(file.path)
  const fileName = data.name + '.' + file.name.split('.').pop()
  let filePath = path.join(BASE_PATH, 'public/uploads/' + fileName)
  const fileDir = path.join(BASE_PATH, 'public/uploads/')
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, err => {
      console.log(err)
      console.log('创建失败')
    })
  }
  // 创建写入流
  const upStream = fs.createWriteStream(filePath)
  render.pipe(upStream)

  // 给指定id的用户修改头像
  const id = data.uId
  await User.findOne({
      where: {
        id
      }
    })
    .then(res => {
      res.update({
        avatar: TEST_URL + 'uploads/' + fileName
      })
    })
  ctx.body = {
    code: 200
  }
})

module.exports = router