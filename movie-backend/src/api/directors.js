const router = require("express").Router();
const db = require("../db");

router.get("/", async (request, response) => {
  try {
    const directors = await db.fetchDirector();
    return response.json(directors.map(d => d.name))
  } catch (err) {
    next(err)
  }
});

module.exports = router;