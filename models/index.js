const Word = require("./word");
const { User, registerSchema, loginSchema } = require("./user");
const Session = require("./session");

module.exports = { Word, User, registerSchema, loginSchema, Session };
