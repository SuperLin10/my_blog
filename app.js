const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');  // 使用 Nunjucks 模板引擎
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
// 导入controller middleware:
const controller = require('./routes');

//log工具
const logUtil = require('./utils/log_util');

const VIEWSDIR = __dirname + '/views';

// set middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// set views
app.use(views(__dirname + '/views'));

// set logger
app.use(async (ctx, next) => {
    const start = new Date();  // 响应开始时间
    var ms;  // 响应间隔时间
    try {
        await next();  // 开始进入下一个中间件
        ms = new Date() - start;
        logUtil.logResponse(ctx, ms);  // 记录响应时间
    } catch (error) {
      ms = new Date() - start;
      logUtil.logError(ctx, error, ms);  //记录异常日志
    }
});

app.use(controller());

// response
app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});

module.exports = app;
