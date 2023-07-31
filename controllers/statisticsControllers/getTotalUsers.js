const { User } = require("../../models");

const getTotalUsers = async (req, res) => {
  const totalUsers = await User.estimatedDocumentCount({});

  res.json({ totalUsers });
};

module.exports = getTotalUsers;
