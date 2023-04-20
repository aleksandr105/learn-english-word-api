const { Word } = require("../../models");
const { HttpError } = require("../../helpers");

const getWords = async (_, res, next) => {
  const allWords = await Word.aggregate([{ $sample: { size: 10 } }]);

  if (!allWords) throw HttpError(404, "Not found");

  res.json(allWords);
};

module.exports = getWords;
