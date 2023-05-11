const { Session } = require("../../models");

const logout = async (req, res) => {
  await Session.deleteOne({ _id: req.sessionId });

  res.json({ message: "Logout success" });
};

module.exports = logout;
