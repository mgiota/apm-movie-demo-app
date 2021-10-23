const db = require("../db");
const router = require("express").Router();
const url = require('url')
const { query } = require("express");
const apm = require('elastic-apm-node')

router.get("/", async (request, response, next) => {
  apm.setTransactionName("GET /movies")
  try {
    // only allow one genre to be requested
    if (Array.isArray(request.query.genre)) {
      throw new ParamsNotAllowedError("Only one genre allowed")
    }
    // fake a server side error for demo purposes
    if (request.query.genre && request.query.genre === "fail") {
      throw `Server temporarily not available`
    }
    if (request.query.genre) {
      apm.setLabel("genre", request.query.genre.toLowerCase())
    }
    const movies = await db.fetchMovie(request.query);
    return response.json(movies)
  } catch (err) {
    if (err instanceof db.MovieNotFoundError) {
      apm.captureError(err)
      return response.json([])
    }
    next(err)
  }
});

class ParamsNotAllowedError extends Error {
  constructor(msg) {
    super(msg)
    this.name = "ParamsNotAllowedError"
  }
}


module.exports = {
  moviesRouter: router,
  ParamsNotAllowedError: ParamsNotAllowedError
}