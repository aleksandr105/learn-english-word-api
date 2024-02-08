const express = require("express");
const { authenticate, ctrlWrapper, validateBody } = require("../middlewares");
const {
  getTotalUsers,
  saveStatistic,
  getUserStatistic,
} = require("../controllers");
const { statisticSchema } = require("../models");

const router = express.Router();

router.get("/total/users", getTotalUsers);

router.patch(
  "/save_statistic",
  authenticate,
  validateBody(statisticSchema),
  ctrlWrapper(saveStatistic)
);

router.get("/get_user_statistic", authenticate, ctrlWrapper(getUserStatistic));

module.exports = router;
