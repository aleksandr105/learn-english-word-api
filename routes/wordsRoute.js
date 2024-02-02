const express = require("express");
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
  searchWordsInBlockList,
  searchUserWords,
} = require("../controllers");
const { ctrlWrapper, authenticate } = require("../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(getWords));

router.get(
  "/get_words_block_list",
  authenticate,
  ctrlWrapper(getWordsBlockList)
);

router.get(
  "/get_words_for_authorized",
  authenticate,
  ctrlWrapper(getBaseWordsForAuthorizedUser)
);

router.patch(
  "/add_word_to_block_list",
  authenticate,
  ctrlWrapper(addToBlockList)
);

router.delete(
  "/remove_word_from_block_list",
  authenticate,
  ctrlWrapper(removeWithBlockList)
);

router.patch("/add_user_word", authenticate, ctrlWrapper(addUserWord));

router.get("/get_user_words", authenticate, ctrlWrapper(getUserWords));

router.get("/get_all_user_words", authenticate, ctrlWrapper(getAllUserWords));

router.delete("/remove_user_words", authenticate, ctrlWrapper(removeUserWords));

router.get(
  "/get_search_words_block_list/:searchText",
  authenticate,
  ctrlWrapper(searchWordsInBlockList)
);

router.get(
  "/search_user_words/:searchText",
  authenticate,
  ctrlWrapper(searchUserWords)
);

module.exports = router;
