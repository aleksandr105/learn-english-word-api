const express = require("express");
const router = express.Router();
const { sendDeveloperMessage } = require("../controllers");
const { authenticate, ctrlWrapper, validateBody } = require("../middlewares");
const { sendMessageDeveloperSchema } = require("../schemas");

router.post(
  "/developer",
  authenticate,
  validateBody(sendMessageDeveloperSchema),
  ctrlWrapper(sendDeveloperMessage)
);

module.exports = router;
