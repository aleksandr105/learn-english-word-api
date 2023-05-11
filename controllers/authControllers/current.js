const currentUser = async (req, res) => {
  res.json(req.user);
};

module.exports = currentUser;
