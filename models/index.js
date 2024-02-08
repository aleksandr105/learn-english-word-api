const Word = require("./word");
const {
  User,
  registerSchema,
  loginSchema,
  resendSchema,
  statisticSchema,
} = require("./user");
const Session = require("./session");
const { UserWord, userWordSchema } = require("./userWord");

module.exports = {
  Word,
  User,
  UserWord,
  registerSchema,
  loginSchema,
  Session,
  resendSchema,
  userWordSchema,
  statisticSchema,
};
