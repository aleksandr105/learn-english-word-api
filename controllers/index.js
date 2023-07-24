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
const { sendDeveloperMessage } = require("./sendControllers");

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
  sendDeveloperMessage,
};
