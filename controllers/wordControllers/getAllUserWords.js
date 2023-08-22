const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const getAllUserWords = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const { userWords } = await UserWord.findOne({ owner: _id });

  if (!userWords) throw HttpError(404, "The document is not found");

  res.json(userWords);
};

module.exports = getAllUserWords;
