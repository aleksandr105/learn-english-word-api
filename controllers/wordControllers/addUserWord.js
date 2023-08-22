const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");
const { Types } = require("mongoose");

const addUserWord = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const { ...word } = req.body;

  const [userWord] = Object.keys(word);

  const userWords = await UserWord.findOneAndUpdate(
    { owner: _id },
    { $addToSet: { userWords: { _id: new Types.ObjectId(), ...word } } },
    { new: true }
  );

  if (!userWords) throw HttpError(404, "The document is not found");

  res.status(201).json({
    message: `Word (${userWord}) successfully written to your data base`,
    userWords: userWords.userWords,
  });
};

module.exports = addUserWord;
