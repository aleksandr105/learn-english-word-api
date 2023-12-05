const { UserWord } = require("../../models");
const { HttpError } = require("../../helpers");

const searchWordsInBlockList = async (req, res) => {
  const { searchText } = req.params;

  const {
    user: { _id },
  } = req;

  const { page = 1, limit = 3 } = req.query;

  const skip = (page - 1) * limit;

  const data = await UserWord.aggregate([
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
                options: "i",
              },
            },
          },
        },
      },
    },
    { $unwind: "$matchingWords" },
    {
      $facet: {
        totalCount: [
          {
            $count: "total",
          },
        ],
        matchingWords: [
          { $skip: skip },
          { $limit: parseInt(limit) },
          {
            $group: {
              _id: null,
              matchingWords: { $push: "$matchingWords" },
            },
          },
          {
            $project: {
              _id: 0,
              matchingWords: 1,
            },
          },
        ],
      },
    },
  ]);
  if (!data) throw HttpError(404, "The user or words is not found");

  const elements = data[0].matchingWords[0]?.matchingWords || [];

  const total = data[0].totalCount[0]?.total || 0;

  res.json({ data: elements, total });
};

module.exports = searchWordsInBlockList;
