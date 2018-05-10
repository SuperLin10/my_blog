let router = require('koa-router')();

let index = async (ctx, next) => {
  let data = {};
  console.log('I am process');
  await ctx.render('index', data);
};

module.exports = [
  {
    method: 'get',
    uri: '',
    fn: index,
  }
]
