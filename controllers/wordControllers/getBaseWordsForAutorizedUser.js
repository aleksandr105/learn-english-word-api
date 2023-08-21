const { UserWord, Word } = require("../../models");
const { HttpError, getRandomUniqueElements } = require("../../helpers");

const getBaseWordsForAuthorizedUser = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const userDataWords = await UserWord.findOne({ owner: _id });

  if (!userDataWords) throw HttpError(404, "The document is not found");

  const { blockList, baseWords } = userDataWords;

  if (baseWords.length < 100) {
    const howWordsNeed = 100 - baseWords.length;

    const newBlockList = [
      "qwerty",
      ...blockList,
      ...baseWords.map((el) => Object.keys(el)[1]),
    ];

    const oneHundredWords = await Word.aggregate([
      {
        $match: {
          $and: newBlockList.map((key) => ({ [key]: { $exists: false } })),
        },
      },
      { $sample: { size: howWordsNeed } },
    ]);

    const updatedUserData = await UserWord.findOneAndUpdate(
      { owner: _id },
      { $addToSet: { baseWords: { $each: oneHundredWords } } },
      { new: true }
    );

    const randomTenWords = getRandomUniqueElements(updatedUserData.baseWords);

    return res.json(randomTenWords);
  }

  const randomTenWords = getRandomUniqueElements(baseWords);

  res.json(randomTenWords);
};

module.exports = getBaseWordsForAuthorizedUser;
