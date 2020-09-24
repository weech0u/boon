module.exports = {
  // 开发环境
  environment: 'dev',
  database: {
    name: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '89974037zxc'
  },
  security: {
    secretKey: 'a635fc6d-3666-44e9-ae48-74827f62528b',
    expiresIn: 60*60 // 过期时间, 1h
  }
}