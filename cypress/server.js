const Koa = require('koa')
const mount = require('koa-mount')
const server = require('koa-static')
const path = require('path')

const baseUrl = require('../build').base
const buildDir = '../dist'
const port = 8888

const start = () =>
  new Promise((resolve, reject) => {
    const app = new Koa()
    app.use(mount(baseUrl, server(path.join(__dirname, buildDir))))

    app.on('error', (err) => {
      reject(err)
    })

    app.listen(port, (listeningServer) => {
      console.log('server is listening on ' + port)
      resolve(listeningServer)
    })
  })

module.exports = {
  port,
  start,
}
