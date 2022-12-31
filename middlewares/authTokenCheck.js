const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helper/errors");
const { User } = require("../models/userModel");

const authTokenCheckMiddleware = async (req, res, next) => {
  if (req.method === "POST") {
    return next();
  }
  const [, token] = req.headers.authorization.split(" ");
  if (!token) {
    next(new NotAuthorizedError("Not authorized"));
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SALT);
    const dbUser = await User.findOne({ _id: user._id });
    if (token !== dbUser.token) next(new NotAuthorizedError("Not authorized"));
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError(error.message));
  }
};

module.exports = {
  authTokenCheckMiddleware,
};
