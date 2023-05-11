const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./current");
const refresh = require("./refresh");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const googleController = require("./googleController");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  refresh,
  googleAuth,
  googleRedirect,
  googleController,
};
