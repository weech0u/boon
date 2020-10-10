// 作为基类, 捕捉全局异常
class HttpException extends Error {
  constructor(msg = 'server error', code = 400) {
    super()
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg=  msg || '参数错误'
  }
}

class Success extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 201
    this.msg = msg || 'OK'
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 403
    this.msg = msg
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  Forbbiden
}