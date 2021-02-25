/*
 * @Author: your name
 * @Date: 2020-09-17 13:28:43
 * @LastEditTime: 2021-02-23 17:29:05
 * @LastEditors: zhou wei
 * @Description: In User Settings Edit
 * @FilePath: /boon/app.js
 */
const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const http = require('http')

// 封装好的管理路由的自定义类
const InitManager = require('./core')
const catchError = require('./middleware/exception')

// 根据模型创建数据库
require('./app/models/user')
require('./app/models/article')
require('./app/models/love')
require('./app/models/collections')
require('./app/models/follow')
require('./app/models/messages')

const app = new Koa()

app
  .use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024 // 最大接收2M的文件
    }
  }))
  .use(cors())
  .use(catchError)
  // koa-static: 前端可直接访问静态图片 需省略public
  .use(require('koa-static')(__dirname + '/public'))

InitManager.initCore(app)

// ws共享端口, 改写Koa原本的写法
const server = http.createServer(app.callback())
require('./core/ws')(server)

server.listen(3001)