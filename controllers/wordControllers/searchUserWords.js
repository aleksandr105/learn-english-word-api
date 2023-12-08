const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const searchUserWords = async (req, res) => {
  const { searchText } = req.params;

  const {
    user: { _id },
  } = req;

  const { page = 1, limit = 3 } = req.query;

  const skip = (page - 1) * limit;

  const [{ userWords }] = await UserWord.find({ owner: _id }, "userWords");

  if (!userWords) throw HttpError(404, "The user or words is not found");

  const searchResult = userWords
    .map((el) => Object.keys(el)[1])
    .filter((el) => el.toLowerCase().includes(searchText.toLowerCase()));

  const total = searchResult.length;

  const data = searchResult.slice(Number(skip), Number(skip) + Number(limit));

  res.json({ data, total });
};

module.exports = searchUserWords;
