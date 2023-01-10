const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const { checkCredentials } = require("../helper/checkCredentials");
require("dotenv").config();

const { MainError } = require("../helper/errors");
const { sendMail } = require("../helper/sendMail");
const { User } = require("../models/userModel");

const registration = async (body) => {
  const checkEMail = await User.findOne({ email: body.email });
  if (checkEMail) {
    throw new MainError(409, "Email in use");
  }

  const verificationToken = sha256(body.email + process.env.JWT_SALT);
  body.verificationToken = verificationToken;
  const user = new User(body);

  sendMail(body.email, verificationToken);
  return await user.save();
};
const login = async ({ email, password }) => {
  const user = await User.findOne({ email, verify: true });

  checkCredentials(user, password)

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

const updateAvatar = async (userId, avatarURL) => {
  await User.findOneAndUpdate({ _id: userId }, { $set: { avatarURL } });
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken, verify: false });
  if (!user) {
    throw new MainError(404, "User not found");
  }
  user.verificationToken = "null";
  user.verify = true;
  await user.save();
};

const resendVerification = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new MainError(400, "User not found");
  }
  if (user.verify) {
    throw new MainError(400, "Verification has already been passed");
  }

  sendMail(email, user.verificationToken);

};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
  updateAvatar,
  verifyUser,
  resendVerification,
};
