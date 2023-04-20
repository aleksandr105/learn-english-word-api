const express = require("express");
const { getWords } = require("../../controllers");

const router = express.Router();

router.get("/", getWords);

module.exports = router;
