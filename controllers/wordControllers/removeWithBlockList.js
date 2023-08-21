const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const removeWithBlockList = async (req, res) => {
  const { words } = req.body;
  const {
    user: { _id },
  } = req;

  const newBlockList = await UserWord.findOneAndUpdate(
    { owner: _id },
    { $pull: { blockList: { $in: words } } },
    { new: true }
  );

  if (!newBlockList) throw HttpError(404, "The document is not found");

  res.status(200).json({
    message: `Words (${words}) removed from block list`,
    newBlockList: newBlockList.blockList,
  });
};

module.exports = removeWithBlockList;
