const { Schema, model } = require("mongoose");

const sessionsSchema = Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Session = model("session", sessionsSchema);

module.exports = Session;
