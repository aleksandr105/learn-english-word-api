const { getWords } = require("./wordControllers");
const {
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
  googleController,
  verifyEmailController,
  resendEmail,
};
