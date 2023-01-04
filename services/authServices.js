const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Conflict, NotAuthorizedError } = require("../helper/errors");
const { User } = require("../models/userModel");

const registration = async (body) => {
  const checkEMail = await User.findOne({ email: body.email });
  if (checkEMail) {
    throw new Conflict("Email in use");
  }

  const user = new User(body);
  return await user.save();
};
const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  const isCorrectCredentials =
    !user && !(await bcrypt.compare(password, user.password));
  if (isCorrectCredentials)
    throw new NotAuthorizedError(`Email or password is wrong`);

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SALT,
    { expiresIn: "1d" }
  );
  await User.findByIdAndUpdate(user._id, { $set: { token } });
  return { user, token };
};

const logout = async (userId) => {
  await User.findOneAndUpdate({ _id: userId }, { $set: { token: null } });
};

const currentUser = async (userId) => {
  const { email, subscription } = await User.findOne({ _id: userId });
  return { email, subscription };
};

const updateSubscription = async (userId, subscription) => {
  await User.findByIdAndUpdate(userId, { $set: { subscription } });
};

const updateAvatar = async () => {

}

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
  updateAvatar,
};
