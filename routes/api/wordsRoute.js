const express = require("express");
const { getWords } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(getWords));

module.exports = router;
