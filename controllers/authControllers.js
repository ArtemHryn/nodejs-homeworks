const {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
} = require("../services/authServices");

const registrationController = async (req, res) => {
  const { email, subscription } = await registration(req.body);
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

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
};
