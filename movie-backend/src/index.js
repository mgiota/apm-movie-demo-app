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