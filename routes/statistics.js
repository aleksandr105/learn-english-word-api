const express = require("express");
const { authenticate } = require("../middlewares");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  res.json({ work: true });
});

module.exports = router;
