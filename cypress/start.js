const cypress = require('cypress')
const server = require('./server')
const { base } = require('../vite.config')
const baseUrl = `http://localhost:${server.port}${base}`

return server.start().then((listeningServe) => {
  return cypress
    .run({
      browser: process.env.BROWSER || 'electron',
      config: {
        baseUrl,
        video: false,
      },
    })
    .then((results) => {
      if (results.totalFailed > 0) {
        process.exit(1)
      } else {
        process.exit(0)
      }
    })
    .catch((err) => {
      listeningServe.close()
      console.error(err)
      process.exit(1)
    })
})
