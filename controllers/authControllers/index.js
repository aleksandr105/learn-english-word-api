const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./current");
const refresh = require("./refresh");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const googleController = require("./googleController");
const verifyEmailController = require("./verifyEmailController");
const resendEmail = require("./resendEmail");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  refresh,
  googleAuth,
  googleRedirect,
  googleController,
  verifyEmailController,
  resendEmail,
};
