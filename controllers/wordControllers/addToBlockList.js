const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const addToBlockList = async (req, res) => {
  const { words } = req.body;
  const {
    user: { _id },
  } = req;

  const newBlockList = await UserWord.findOneAndUpdate(
    { owner: _id },
    { $addToSet: { blockList: { $each: words } } },
    { new: true }
  );

  if (!newBlockList) throw HttpError(404, "The document is not found");

  await UserWord.findOneAndUpdate(
    { owner: _id },
    {
      $pull: {
        baseWords: {
          $or: words.map((word) => ({ [word]: { $exists: true } })),
        },
      },
    },
    { new: true }
  );

  res.status(200).json({
    message: `Words ${words} added to block list`,
    newBlockList: newBlockList.blockList,
  });
};

module.exports = addToBlockList;
