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

  const allLessons = correctAnswers + incorrectAnswers;

  const calculatePercentage = () => {
    const number = (correctAnswers / allLessons) * 100;

    if (!number)
      return { successLessonPercentage: 0, errorLessonPercentage: 0 };

    const successLessonPercentage = Math.round(number);

    const errorLessonPercentage = 100 - successLessonPercentage;

    return { successLessonPercentage, errorLessonPercentage };
  };

  const { successLessonPercentage, errorLessonPercentage } =
    calculatePercentage();

  res.json({
    allLessons,
    correctAnswers,
    incorrectAnswers,
    successLessonPercentage,
    errorLessonPercentage,
    learnedWordsCount: `${blockListCount} / ${allWordsCount}`,
    wordsToLearn: allWordsCount - blockListCount,
    personalDictionaryCount,
  });
};

module.exports = getUserStatistic;
