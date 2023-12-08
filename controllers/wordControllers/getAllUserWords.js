const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const getAllUserWords = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;

  const { userWords } = await UserWord.findOne({ owner: _id });

  if (!userWords) throw HttpError(404, "The document is not found");

  const data = userWords.map((el) => Object.keys(el)[1]);

  const response = data.slice(Number(skip), Number(skip) + Number(limit));

  res.json({ data: response, total: data.length });
};

module.exports = getAllUserWords;
