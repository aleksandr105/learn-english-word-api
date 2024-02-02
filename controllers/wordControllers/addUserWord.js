const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");
const { Types } = require("mongoose");

const addUserWord = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const { ...word } = req.body;

  const [userWord] = Object.keys(word);

  const userWordTranslate = word[userWord][1];

  const { userWords } = await UserWord.findOne({ owner: _id }, "userWords");

  if (!userWords) throw HttpError(404, "The document is not found");

  const isDuplicateWord = userWords.some(
    (el) =>
      Object.keys(el)[1]?.toLowerCase() === userWord?.toLowerCase() ||
      Object.values(el)[1][1]?.toLowerCase() ===
        userWordTranslate?.toLowerCase()
  );

  if (isDuplicateWord) throw HttpError(400, " the word is already exists");

  const newUserWords = await UserWord.findOneAndUpdate(
    { owner: _id },
    { $addToSet: { userWords: { _id: new Types.ObjectId(), ...word } } },
    { new: true }
  );

  res.status(201).json({
    message: `Word (${userWord}) successfully written to your data base`,
    userWords: newUserWords.userWords,
  });
};

module.exports = addUserWord;
