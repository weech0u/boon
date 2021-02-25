/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-23 16:07:43
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-24 15:50:36
 */
// ws 相关
const jwt = require('jsonwebtoken')
const url = require('url')
const {
  Forbbiden
} = require('../core/http-exception')
function Ws(server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })
  const sockets = {}
  io.on('connection', socket => {
    let decode
    try {
      decode = jwt.verify(socket.handshake.auth.Authorization, global.config.security.secretKey)
    } catch (error) {
      throw new Forbbiden('token已过期')
    }
    const from = socket.handshake.query.from
    sockets[from] = socket.id
    socket.on('message', message => {
      socket.to(sockets[message.to]).emit('init', {
        sender_uid: message.from,
        receiver_uid: message.to,
        content: message.content
      })
      socket.emit(socket.id, 'success')
      // sockets.forEach(socket => {
      //   io.to(groupid).emit('init', {
      //     id: uuidv4(),
      //     content: message,
      //     from: sockets.id
      //   })
      // })
    })
    socket.on('disconnect', () => {
      console.log('断开连接')
    })
  })
}


module.exports = Ws