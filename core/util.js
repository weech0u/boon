const jwt = require('jsonwebtoken')
const moment = require('moment')
moment.locale('zh-cn')

const generateIdByDate = function () {
  const _today = moment()
  return _today.format('YYYYMMDDhhmmss')
}

const generateDateFormat = function (format) {
  const today = {}
  const _today = moment()
  today.year = _today.format('yyyy') // 当前年份
  today.date = _today.format('YYYY-MM-DD hh:mm:ss') // 当前时间 
  today.yesterday = _today.subtract(1, 'days').format('YYYY-MM-DD'); /*前一天的时间*/
  return today
}

const howLongAgo = function (format) {
  const compare = moment(format)
  return compare.fromNow()
}


const generateToken = function (uid, scope) {
  const secretKey = global.config.security.secretKey
  console.log(secretKey)
  const expiresIn = global.config.security.expiresIn
  const token = jwt.sign({
    uid,
    scope
  }, secretKey, {
    expiresIn
  })
  return token
}

module.exports = {
  generateIdByDate,
  generateToken,
  generateDateFormat,
  howLongAgo
}