const { Schema, model } = require("mongoose");

const wordSchema = new Schema({}, { versionKey: false, timestamps: false });

const Word = model("word", wordSchema);

module.exports = Word;
