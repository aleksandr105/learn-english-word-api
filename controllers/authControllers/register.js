const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, language = "en" } = req.body;

  if (await User.findOne({ email })) {
    const errorMessage = {
      ru: `Почта ${email} уже используется`,
      pl: `Poczta ${email} jest już używana`,
      ua: `Пошта ${email} вже використовується`,
      en: `Mail ${email} is already in use`,
    };

    throw HttpError(409, errorMessage[language]);
  }

  const passwordHashed = await bcrypt.hash(password, 10);
  const verificationCode = v4();

  const createUser = await User.create({
    ...req.body,
    password: passwordHashed,
    verificationCode,
  });

  await sendEmail(
    createUser.email,
    `${BASE_URL}/api/auth/verify/${verificationCode}/`
  );

  res.status(201).json({ name: createUser.name, email: createUser.email });
};

module.exports = register;
