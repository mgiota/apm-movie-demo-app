// Add this to the VERY top of the first file loaded in your app
const apm = require('elastic-apm-node')
apm.start({
  // Override service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: '',

  // Use if APM Server requires a token
  secretToken: '<your-apm-server-secret-token>',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: '<your-apm-server-url>',
})

const express = require('express')
const app = express()
const port = 3001

// showcase example app with automatic instrumentation
const genreRouter = require("./api/genres");
const directorsRouter = require("./api/directors");
const { moviesRouter, ParamsNotAllowedError } = require('./api/movies')

app.use("/genres", genreRouter);
app.use("/directors", directorsRouter);
app.use("/movies", moviesRouter);

// first connect the apm middleware
app.use(apm.middleware.connect())

// then register any other middleware error handlers
function errorHandler(err, req, res, next) {
  if (err instanceof ParamsNotAllowedError) {
    res.status(400)
  } else if (res.status) {
    // catch all
    res.status(500)
  }
  res.json({ error: err.message })
}
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})