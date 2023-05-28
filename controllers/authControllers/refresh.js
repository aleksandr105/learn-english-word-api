const { Session } = require("../../models");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } = process.env;

const refresh = async (req, res) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer")
    throw HttpError(401, "invalid token or not authorized");

  if (!token || token === "null")
    throw HttpError(401, "invalid token or not authorized");

  const { exp: tokenExpiration, sessionId: decodeSessionId } =
    jwt.decode(token);
  const currentDate = Math.floor(Date.now() / 1000);

  if (tokenExpiration < currentDate) {
    await Session.deleteOne({ _id: decodeSessionId });
    throw HttpError(401, "Refresh token expired");
  }

  const { userId, sessionId } = jwt.verify(token, SECRET_KEY);

  const currentSession = await Session.findById(sessionId);

  if (!currentSession) throw HttpError(401, "not authorized");

  await Session.deleteOne({ _id: sessionId });
  const { _id: newSessionId } = await Session.create({ uid: userId });

  const accessToken = jwt.sign(
    { userId, sessionId: newSessionId },
    SECRET_KEY,
    {
      expiresIn: ACCESS_TOKEN_TIME,
    }
  );

  const refreshToken = jwt.sign(
    { userId, sessionId: newSessionId },
    SECRET_KEY,
    {
      expiresIn: REFRESH_TOKEN_TIME,
    }
  );

  res.json({ accessToken, refreshToken });
};

module.exports = refresh;
