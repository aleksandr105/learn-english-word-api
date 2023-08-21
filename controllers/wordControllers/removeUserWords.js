const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const removeUserWords = async (req, res) => {
  const { words } = req.body;

  const {
    user: { _id },
  } = req;

  const newUserWords = await UserWord.findOneAndUpdate(
    { owner: _id },
    {
      $pull: {
        userWords: {
          $or: words.map((word) => ({ [word]: { $exists: true } })),
        },
      },
    },
    { new: true }
  );

  if (!newUserWords) throw HttpError(404, "The document is not found");

  res.json(newUserWords);
};

module.exports = removeUserWords;
