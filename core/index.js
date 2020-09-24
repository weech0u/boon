const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager{
  static initCore(app) {
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    // InitManager.loadHttpException()
    InitManager.loadConfig()
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)  
    global.config = config
  }

  static initLoadRouters() {
    // 扫描api文件夹下的文件(包括子文件夹), 筛选出router类型的对象
    const apiDirectory = `${process.cwd()}/app/api`
    const v1 = requireDirectory(module, apiDirectory, { 
      visit: whenLoadModule
    })

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  // static loadHttpException() {
  //   const errs = require('./http-exception')
  //   global.errors = errs
  // }
}

module.exports = InitManager