const { COUNT_GET_WORDS } = process.env;

const getRandomUniqueElements = (array, count = COUNT_GET_WORDS) => {
  if (array.length < count) return array;

  const copyAarray = array.slice();

  for (let i = copyAarray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyAarray[i], copyAarray[j]] = [copyAarray[j], copyAarray[i]];
  }
  return copyAarray.slice(0, count);
};

module.exports = getRandomUniqueElements;
