const { getWords } = require("./wordControllers");
const {
  register,
  login,
  logout,
  currentUser,
  refresh,
  googleAuth,
  googleRedirect,
} = require("./authControllers");

module.exports = {
  getWords,
  register,
  login,
  logout,
  currentUser,
  refresh,
  googleAuth,
  googleRedirect,
};
