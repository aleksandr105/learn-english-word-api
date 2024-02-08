const { User } = require("../../models");

const saveStatistic = async (req, res) => {
  const { answer } = req.body;
  const { _id } = req.user;

  if (answer === "correct") {
    await User.findByIdAndUpdate(_id, {
      $inc: { "statistic.correctAnswers": 1 },
    });

    res.json({ saved: "correctAnswers +1" });
  }

  if (answer === "incorrect") {
    await User.findByIdAndUpdate(_id, {
      $inc: { "statistic.incorrectAnswers": 1 },
    });

    res.json({ saved: "incorrectAnswers +1" });
  }
};

module.exports = saveStatistic;
