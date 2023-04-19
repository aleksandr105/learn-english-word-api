const { Word } = require("../../models");

const getWords = async (req, res) => {
  try {
    const allWords = await Word.find();
    res.json(allWords);
  } catch (error) {}
};

module.exports = getWords;
