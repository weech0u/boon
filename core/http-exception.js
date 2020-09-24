// 作为基类, 捕捉全局异常
class HttpException extends Error {
  constructor(msg = 'server error', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg=  msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

class Success extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 201
    this.msg = msg || 'OK'
    this.errorCode = errorCode || 0
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 403
    this.msg = msg
    this.errorCode = 10006
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  Forbbiden
}