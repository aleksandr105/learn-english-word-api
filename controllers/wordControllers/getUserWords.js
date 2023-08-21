const { UserWord } = require("../../models");
const { HttpError, getRandomUniqueElements } = require("../../helpers");

const getUserWords = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const { userWords } = await UserWord.findOne({ owner: _id }, "userWords");

  if (!userWords) throw HttpError(404, "The document is not found");

  const tenUserWords = getRandomUniqueElements(userWords);

  res.json(tenUserWords);
};

module.exports = getUserWords;
