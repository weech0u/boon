const Koa = require('koa')
const parser = require('koa-bodyparser')
const cors = require('koa2-cors')

// 封装好的管理路由的自定义类
const InitManager = require('./core')
const catchError = require('./middware/exception')

// 根据模型创建数据库
require('./app/models/user')
require('./app/models/article')

const app = new Koa()
app
.use(cors())
.use(parser())
.use(catchError)

InitManager.initCore(app)

app.listen(3001)

