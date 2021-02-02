const basicAuth = require('basic-auth')
const {
  compareSync
} = require('bcryptjs')
const {
  Forbbiden
} = require('../core/http-exception')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    // API级别
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
  }

  get m() {
    return async (ctx, next) => {
      // HTTP 规定 身份验证机制 HttpBasicAuth
      const token = ctx.req.headers.authorization.split(' ')[1]
      // const token = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      if (!token) {
        throw new Forbbiden(errMsg)
      }
      try {
        var decode = jwt.verify(token,
          global.config.security.secretKey)
      } catch (error) {
        // 1. token不合法
        // 2. token过期
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
          throw new Forbbiden(errMsg)
        }
        
      }
      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new Forbbiden(errMsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }
}

module.exports = {
  Auth
}