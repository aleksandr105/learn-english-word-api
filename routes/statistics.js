const express = require("express");
// const { authenticate } = require("../middlewares");
const { getTotalUsers } = require("../controllers");

const router = express.Router();

router.get("/total/users", getTotalUsers);

module.exports = router;
