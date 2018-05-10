const fs = require('fs');
const path = require('path');

function addRoutes(router, routes) {
  for (let index in routes) {
    switch (routes[index].method) {
      case 'post':
        router.post(routes[index].uri, routes[index].fn)
        console.log(`** Register post url: ${routes[index].uri} **`)
        break
      case 'get':
        router.get(routes[index].uri, routes[index].fn)
        console.log(`** Register get url: ${routes[index].uri} **`)
        break
      default:
        console.log(`** Invalid url: ${routes[index]} **`)
    }
  }
}

function addControllers(router) {
  let controllersPath = path.join(__dirname, '../', 'controllers')
  let files = fs.readdirSync(controllersPath)
  let controllerFiles = files.filter(f => {
    return f.endsWith('.js')
  })

  for (let index in controllerFiles) {
    console.log(`process controller: ${controllerFiles[index]}...`);
    let routes = require(path.join(controllersPath, controllerFiles[index]));
    addRoutes(router, routes);
  }
}

module.exports = () => {
  let router = require('koa-router')()
  addControllers(router)
  return router.routes()
}
