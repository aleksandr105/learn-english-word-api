const { Word } = require("../../models");

const getWords = async (_, res) => {
  try {
    const allWords = await Word.aggregate([{ $sample: { size: 10 } }]);
    res.json(allWords);
  } catch (error) {}
};

module.exports = getWords;
