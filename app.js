/*
 * @Author: your name
 * @Date: 2020-09-17 13:28:43
 * @LastEditTime: 2021-02-19 16:39:45
 * @LastEditors: zhou wei
 * @Description: In User Settings Edit
 * @FilePath: /boon/app.js
 */
const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')

// 封装好的管理路由的自定义类
const InitManager = require('./core')
const catchError = require('./middleware/exception')

// ws 相关
const http = require('http')
const { sendMessage } = require('./utils/message')
const { v4:uuidv4 } = require('uuid')

// 根据模型创建数据库
require('./app/models/user')
require('./app/models/article')
require('./app/models/love')
require('./app/models/collections')
require('./app/models/follow')

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
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
const sockets = []
// io.on('connection', socket => {
//   sockets.push({id:socket.id})
//   socket.on('message', message => {
//     sockets.forEach(socket => {
//       io.to(socket.id).emit('init', {
//         id: uuidv4(),
//         content: message,
//         from: sockets.id
//       })
//     })
//   })
//   socket.on('disconnect', () => {
//     console.log('断开连接')
//   })
// })

server.listen(3001)