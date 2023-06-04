const { User, Session } = require("../../models");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } = process.env;

const login = async (req, res) => {
  const { email, password, language = "en" } = req.body;

  const messageNotCorrectData = {
    ru: `Пароль или почта не верна`,
    pl: `Hasło lub e-mail są nieprawidłowe`,
    ua: `Пароль або пошта не вірна`,
    en: `Password or email is not correct`,
  };

  const messageNotConfirmed = {
    ru: `Почта ${email} не подтверждена`,
    pl: `Poczta ${email} nie potwierdzona`,
    ua: `Пошта ${email} не підтверджена`,
    en: `Email ${email} not confirmed`,
  };

  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, messageNotCorrectData[language]);

  if (!user.isVerify) throw HttpError(403, messageNotConfirmed[language]);

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) throw HttpError(401, messageNotCorrectData[language]);

  const { _id } = await Session.create({ uid: user._id });

  const accessToken = jwt.sign(
    { userId: user._id, sessionId: _id },
    SECRET_KEY,
    {
      expiresIn: ACCESS_TOKEN_TIME,
    }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, sessionId: _id },
    SECRET_KEY,
    {
      expiresIn: REFRESH_TOKEN_TIME,
    }
  );

  res.json({
    accessToken,
    refreshToken,
    user: { email: user.email, name: user.name },
  });
};

module.exports = login;
