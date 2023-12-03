const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const getWordsBlockList = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const { page, limit } = req.query;

  const skip = (page - 1) * limit;

  const { blockList } = await UserWord.findOne({ owner: _id }, "blockList", {
    skip,
    limit: Number(limit),
  });

  if (!blockList) throw HttpError(404, "The document is not found");

  res.json(blockList);
};

module.exports = getWordsBlockList;
