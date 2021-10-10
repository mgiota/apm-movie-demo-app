const db = require("../db");
const router = require("express").Router();
const url = require('url')
const { query } = require("express");

router.get("/", async (request, response, next) => {
  try {
    // only allow one genre to be requested
    if (Array.isArray(request.query.genre)) {
      throw new ParamsNotAllowedError("Only one genre allowed")
    }
    const movies = await db.fetchMovie(request.query);
    return response.json(movies)
  } catch (err) {
    if (err instanceof db.MovieNotFoundError) {
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