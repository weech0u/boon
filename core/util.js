const jwt = require('jsonwebtoken')
const moment = require('moment')

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
  const _today = moment()
  // 当天
  if (_today.isSame(compare, 's')) {
    return 0
  } else if (_today.isSame(compare, 'm')) {
    return '几秒'
  } else if (_today.isSame(compare, 'h')) {
    return _today.diff(compare, 'm') + '分钟'
  } else if (_today.isSame(compare, 'd')) {
    return _today.diff(compare, 'h') + '小时' + compare.diff(moment(format.slice(0, format.length-6)+':00:00'), 'm') + '分钟'
  } else {
    return _today.diff(compare, 'd') + '天'
  }
}
console.log(howLongAgo('2021-01-06 17:35:04'))

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