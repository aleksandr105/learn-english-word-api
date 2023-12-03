const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const getWordsBlockList = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const { page = 1, limit = 1 } = req.query;

  const skip = (page - 1) * limit;

  const blockList = await UserWord.aggregate([
    { $match: { owner: _id } },
    { $unwind: "$blockList" },
    { $project: { _id: 0, blockList: 1 } },
    { $skip: skip },
    { $limit: Number(limit) },
  ]);

  if (!blockList) throw HttpError(404, "The document is not found");

  const data = blockList.map((el) => Object.values(el)[0]);

  res.json(data);
};

module.exports = getWordsBlockList;
