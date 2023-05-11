const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;

  if (await User.findOne({ email }))
    throw HttpError(409, `Email ${email} already in use`);

  const passwordHashed = await bcrypt.hash(password, 10);

  const createUser = await User.create({
    ...req.body,
    password: passwordHashed,
  });

  res.status(201).json(createUser);
};

module.exports = register;
