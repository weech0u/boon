module.exports = {
  // 开发环境
  environment: 'dev',
  database: {
    name: 'island',
    // host: '122.152.204.232',
    host: 'localhost',
    port: 3306,
    user: 'root',
    // password: '89974037Zxc!'
    password: '89974037zxc'
  },
  security: {
    secretKey: 'a635fc6d-3666-44e9-ae48-74827f62528b',
    expiresIn: 60*60*24 // 过期时间, 1h
  },
  BASE_PATH: process.cwd(),
  TEST_URL: 'http://localhost:3001/',
  PRO_URL: ''
}