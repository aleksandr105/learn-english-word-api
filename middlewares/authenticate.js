const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User, Session } = require("../models");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer")
    next(HttpError(401, "invalid token or not authorized"));

  try {
    const { userId, sessionId } = jwt.verify(token, SECRET_KEY);

    const currentSession = await Session.findById(sessionId);

    if (!currentSession) next(HttpError(401, "not authorized"));

    const user = await User.findById(userId, "-createdAt -updatedAt -password");

    req.user = user;
    req.sessionId = sessionId;

    next();
  } catch (error) {
    next(next(HttpError(401, "invalid token or not authorized")));
  }
};

module.exports = authenticate;
