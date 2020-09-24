function isTrueType(val) {
  for (let key in this) {
    if (this[key] !== val) {
      return false
    }
  }
}

// 登录方式
const LoginType = { 
  USER_EMAIL: 201, 
  USER_MOBILE: 202,
  ADMIN_EMAIL: 200,
  isTrueType
}


module.exports = {LoginType}