const {
  HttpException
} = require("../core/http-exception")
const log4js = require('../core/logger')
const logger = log4js.getLogger('default')

// 全局异常监听, 
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 开发环境, 抛出异常
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment == 'dev'
    if (isDev && !isHttpException) {
      throw error
    }

    // 写入日志
    logger.error(`<${error.code}> ${error.msg}`)

    // 生产环境, 接收异常
    if (error instanceof HttpException) {
      console.log(error)
      ctx.body = {
        msg: error.msg,
        code: error.code,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 200
    } else {
      ctx.body = {
        msg: 'unknown error',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError