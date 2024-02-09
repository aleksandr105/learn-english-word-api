const { HttpError } = require("../../helpers");
const { User, Word, UserWord } = require("../../models");

const getUserStatistic = async (req, res) => {
  const { _id } = req.user;

  const statisticPromise = User.findById(_id, "statistic");

  const allWordsCountPromise = Word.countDocuments();

  const blockListCountPromise = UserWord.aggregate([
    { $match: { owner: _id } },
    {
      $project: {
        blockListCount: { $size: "$blockList" },
        personalDictionaryCount: { $size: "$userWords" },
      },
    },
  ]);

  const [
    statistic,
    allWordsCount,
    [{ blockListCount, personalDictionaryCount }],
  ] = await Promise.all([
    statisticPromise,
    allWordsCountPromise,
    blockListCountPromise,
  ]);

  if (!statistic) throw HttpError(404, "The document is not found");

  const { correctAnswers, incorrectAnswers } = statistic.statistic;

  const calculatePercentage = (lessons, allLessons) => {
    const number = (lessons / allLessons) * 100;
    return Math.floor(number * 10) / 10;
  };

  const allLessons = correctAnswers + incorrectAnswers;

  res.json({
    allLessons,
    correctAnswers,
    incorrectAnswers,
    successLessonPercentage: calculatePercentage(correctAnswers, allLessons),
    errorLessonPercentage: calculatePercentage(incorrectAnswers, allLessons),
    learnedWordsCount: `${blockListCount} / ${allWordsCount}`,
    wordsToLearn: allWordsCount - blockListCount,
    personalDictionaryCount,
  });
};

module.exports = getUserStatistic;
