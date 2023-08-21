const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const getAllUserWords = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const { allUserWords } = await UserWord.findOne({ owner: _id }, "userWords");

  if (!allUserWords) throw HttpError(404, "The document is not found");

  res.json(allUserWords);
};

module.exports = getAllUserWords;
