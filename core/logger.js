const log4js = require('log4js')
// const config = require('config')

log4js.configure({
  appenders: {
    fileout: {
      type: "file",
      filename: "fileout.log"
    },
    datafileout: {
      type: "dateFile",
      filename: "datafileout.log",
      pattern: ".yyyy-MM-dd-hh-mm-ss-SSS"
    },
    consoleout: {
      type: "console"
    },
  },
  categories: {
    default: {
      appenders: ["fileout", "consoleout"],
      level: "debug"
    },
    anything: {
      appenders: ["consoleout"],
      level: "debug"
    }
  }
});

// let logger = log4js.getLogger('anything');
// logger.debug("debug")
// logger.info("info")
// logger.warn("info")
// logger.error("error")
// logger.fatal("fatal")

module.exports = log4js