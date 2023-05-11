const { User, Session } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } = process.env;
const bcrypt = require("bcrypt");

const googleController = async (req, res) => {
  const { email, name, id } = req.userData;

  const user = await User.findOne({ email });

  if (!user) {
    const passwordHashed = await bcrypt.hash(id, 10);

    const createUser = await User.create({
      email,
      name,
      password: passwordHashed,
      isVerify: true,
    });

    const { _id } = await Session.create({ uid: createUser._id });

    const accessToken = jwt.sign(
      { userId: createUser, sessionId: _id },
      SECRET_KEY,
      {
        expiresIn: ACCESS_TOKEN_TIME,
      }
    );

    const refreshToken = jwt.sign(
      { userId: createUser, sessionId: _id },
      SECRET_KEY,
      {
        expiresIn: REFRESH_TOKEN_TIME,
      }
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  }

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
    `${process.env.FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

module.exports = googleController;
