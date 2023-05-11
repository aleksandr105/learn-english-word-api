const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  currentUser,
  refresh,
  googleAuth,
  googleRedirect,
  googleController,
} = require("../controllers");
const { ctrlWrapper, validateBody, authenticate } = require("../middlewares");
const { registerSchema, loginSchema } = require("../models");

router.post("/login", validateBody(loginSchema), ctrlWrapper(login));

router.post("/register", validateBody(registerSchema), ctrlWrapper(register));

router.post("/logout", authenticate, ctrlWrapper(logout));

router.get("/current", authenticate, ctrlWrapper(currentUser));

router.post("/refresh", ctrlWrapper(refresh));

router.get("/google", ctrlWrapper(googleAuth));

router.get(
  "/google-redirect",
  ctrlWrapper(googleRedirect),
  ctrlWrapper(googleController)
);

module.exports = router;
