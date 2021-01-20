const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')

// 封装好的管理路由的自定义类
const InitManager = require('./core')
const catchError = require('./middware/exception')

// 根据模型创建数据库
require('./app/models/user')
require('./app/models/article')
require('./app/models/love')

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

app.listen(3001)