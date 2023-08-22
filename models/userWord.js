const { Schema, model } = require("mongoose");
const Joi = require("joi");

const wordUserSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    blockList: {
      type: [String],
      default: [],
    },
    userWords: {
      type: [{}],
      default: [],
    },
    baseWords: {
      type: [{}],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const UserWord = model("user_word", wordUserSchema);

const userWordSchema = Joi.object().pattern(
  /^[a-zA-Z0-9_]{1,13}$/,
  Joi.array().items(Joi.string().min(1)).length(3)
);

module.exports = { UserWord, userWordSchema };
