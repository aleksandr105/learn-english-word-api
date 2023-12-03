const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const searchWordsInBlockList = async (req, res) => {
  const { searchText } = req.params;

  const {
    user: { _id },
  } = req;

  const words = await UserWord.aggregate([
    { $match: { owner: _id } },
    {
      $project: {
        matchingWords: {
          $filter: {
            input: "$blockList",
            as: "word",
            cond: {
              $regexMatch: {
                input: "$$word",
                regex: searchText,
                options: "i", // Для регистронезависимости
              },
            },
          },
        },
      },
    },
  ]);

  if (!words) throw HttpError(404, "The user or words is not found");

  res.json(words[0].matchingWords);
};

module.exports = searchWordsInBlockList;
