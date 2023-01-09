const jwt = require("jsonwebtoken");
const { MainError } = require("../helper/errors");
const { User } = require("../models/userModel");

const authTokenCheckMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");
  if (!token) {
    next(new MainError(401, "Not authorized"));
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SALT);
    const dbUser = await User.findOne({ _id: user._id });
    if (token !== dbUser.token) next(new MainError(401, "Not authorized"));
    req.user = user;
    next();
  } catch (error) {
    next(new MainError(401, error.message));
  }
};

module.exports = {
  authTokenCheckMiddleware,
};
