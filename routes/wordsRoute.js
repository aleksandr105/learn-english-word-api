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
} = require("../controllers");
const { ctrlWrapper, validateBody, authenticate } = require("../middlewares");
const { userWordSchema } = require("../models");

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

router.patch(
  "/add_user_word",
  authenticate,
  validateBody(userWordSchema),
  ctrlWrapper(addUserWord)
);

router.get("/get_user_words", authenticate, ctrlWrapper(getUserWords));

router.delete("/remove_user_words", authenticate, ctrlWrapper(removeUserWords));

module.exports = router;
