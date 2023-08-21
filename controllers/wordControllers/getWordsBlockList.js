const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const getWordsBlockList = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const { blockList } = await UserWord.findOne({ owner: _id }, "blockList");

  if (!blockList) throw HttpError(404, "The document is not found");

  res.json(blockList);
};

module.exports = getWordsBlockList;
