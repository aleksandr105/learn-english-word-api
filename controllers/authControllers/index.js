const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./current");
const refresh = require("./refresh");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  refresh,
  googleAuth,
  googleRedirect,
};
