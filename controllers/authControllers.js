const gravatar = require("gravatar");
const fs = require("fs").promises;
const {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
} = require("../services/authServices");

const registrationController = async (req, res, next) => {
  const { originalname, path } = req.file;
  req.body.avatarURL = gravatar.url(req.body.email);
  const { email, subscription } = await registration(req.body);
  try {
    const [, extension] = originalname.split(".");
    const avatarNameArray = req.body.avatarURL.split("/");
    const newFile = `${
      avatarNameArray[avatarNameArray.length - 1]
    }.${extension}`;
    console.log(newFile);
    await fs.rename(path, `./public/avatars/${newFile}`);
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

const updateAvatar = async (req, res) => {
  const { originalname } = req.file;
  const [, extension] = originalname.split(".");
  const avatarNameArray = gravatar.url(req.body.email).split("/");
  req.body.avatarURL = `${
    avatarNameArray[avatarNameArray.length - 1]
  }.${extension}`;
  await updateAvatar();
  res.json({ avatarURL: req.body.avatarURL });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
  updateAvatar,
};
