const express = require("express");
const { getWords } = require("../controllers");
const ctrlWrapper = require("../middlewares/ctrlWrapper");

const router = express.Router();

router.get("/", ctrlWrapper(getWords));

module.exports = router;
