const router = require("express").Router();
const db = require("../db");

router.get("/", async (request, response) => {
  try {
    let genres = await db.fetchGenre();
    return response.json(genres.map(g => g.name))
  } catch (err) {
    next(err)
  }
});

module.exports = router;