const { User, Session } = require("../../models");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME, FRONTEND_URL } =
  process.env;

const verifyEmailController = async (req, res) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });

  if (!user || verificationCode !== user.verificationCode)
    throw HttpError(401, "Invalid verify link");

  await User.findByIdAndUpdate(user._id, {
    verificationCode: "",
    isVerify: true,
  });

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

  return res.redirect(
    `${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

module.exports = verifyEmailController;
