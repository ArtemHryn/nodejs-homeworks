const gravatar = require("gravatar");
const { copyAvatar } = require("../helper/avatarOptions");
const fs = require("fs").promises;
const {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
  updateAvatar,
  verifyUser,
  resendVerification,
} = require("../services/authServices");

const registrationController = async (req, res, next) => {
  const { path } = req.file;
  req.body.avatarURL = gravatar.url(req.body.email);
  const { email, subscription } = await registration(req.body);
  try {
    await copyAvatar(req.file, req.body);
  } catch (error) {
    await fs.unlink(path);
    return next(error);
  }
  res.status(201).json({ user: { email, subscription } });
};

const loginController = async (req, res) => {
  const {
    user: { email, subscription },
    token,
  } = await login(req.body);
  res.status(200).json({ user: { email, subscription }, token });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.status(204).end();
};

const getCurrentUserController = async (req, res) => {
  const { _id } = req.user;
  const user = await currentUser(_id);
  res.json(user);
};

const updateSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.query;
  await updateSubscription(_id, subscription);
  res
    .status(200)
    .json({ message: `Subscription has been changed to '${subscription}'` });
};

const updateAvatarController = async (req, res, next) => {
  const { _id } = req.user;
  const { path } = req.file;
  req.body.avatarURL = gravatar.url(req.body.email);
  await updateAvatar(_id, req.body.avatarURL);
  try {
    await copyAvatar(req.file, req.body);
  } catch (error) {
    await fs.unlink(path);
    return next(error);
  }
  res.json({ avatarURL: req.body.avatarURL });
};

const verificationController = async (req, res) => {
  const { verificationToken } = req.params;
  await verifyUser(verificationToken);
  res.status(200).json({ status: "Verification successful" });
};

const resendVerificationController = async (req, res) => {
  await resendVerification(req.body.email);
  res.json({ message: "Verification email sent" });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
  updateAvatarController,
  verificationController,
  resendVerificationController,
};
