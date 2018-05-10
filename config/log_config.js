/**
 * log4js 配置文件
 *
 * 日志等级由低到高
 * ALL TRACE DEBUG INFO WARN ERROR FATAL OFF.
 *
 * 关于log4js的appenders的配置说明
 * https://github.com/nomiddlename/log4js-node/wiki/Appenders
 */

var path = require('path');

//日志根目录
var baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
// var errorLogPath = path.resolve(__dirname, "../logs/error/error");



module.exports = {
  replaceConsole: true,
  appenders: {
  stdout: {//控制台输出
    type: 'stdout'
  },
  req: {//请求日志
    type: 'dateFile',
    filename: baseLogPath + '/reqlog/',
    pattern: 'req-yyyy-MM-dd.log',
    alwaysIncludePattern: true
  },
  err: {//错误日志
    type: 'dateFile',
    filename: baseLogPath + '/errlog/',
    pattern: 'err-yyyy-MM-dd.log',
    alwaysIncludePattern: true
  },
  oth: {//其他日志
    type: 'dateFile',
    filename: baseLogPath + '/othlog/',
    pattern: 'oth-yyyy-MM-dd.log',
    alwaysIncludePattern: true
    }
  },
  categories: {
      default: { appenders: ['stdout', 'req'], level: 'debug' },//appenders:采用的appender,取appenders项,level:设置级别
      err: { appenders: ['stdout', 'err'], level: 'error' },
      oth: { appenders: ['stdout', 'oth'], level: 'info' }
  }
}
