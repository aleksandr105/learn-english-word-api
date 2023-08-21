const getWords = require("./getWords");
const addToBlockList = require("./addToBlockList");
const removeWithBlockList = require("./removeWithBlockList");
const getWordsBlockList = require("./getWordsBlockList");
const getBaseWordsForAuthorizedUser = require("./getBaseWordsForAutorizedUser");
const addUserWord = require("./addUserWord");
const removeUserWords = require("./removeUserWords");
const getUserWords = require("./getUserWords");
const getAllUserWords = require("./getAllUserWords");

module.exports = {
  getWords,
  addToBlockList,
  removeWithBlockList,
  getWordsBlockList,
  getBaseWordsForAuthorizedUser,
  addUserWord,
  removeUserWords,
  getUserWords,
  getAllUserWords,
};
