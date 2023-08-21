const {
  getWords,
  addToBlockList,
  removeWithBlockList,
  getWordsBlockList,
  getBaseWordsForAuthorizedUser,
  addUserWord,
  removeUserWords,
  getUserWords,
  getAllUserWords,
} = require("./wordControllers");
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
const { getTotalUsers } = require("./statisticsControllers");

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
  getTotalUsers,
  addToBlockList,
  removeWithBlockList,
  getWordsBlockList,
  getBaseWordsForAuthorizedUser,
  addUserWord,
  removeUserWords,
  getUserWords,
  getAllUserWords,
};
