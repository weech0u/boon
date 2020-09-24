const {
  HttpException
} = require("../core/http-exception")

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

    // 生产环境, 接收异常
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
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