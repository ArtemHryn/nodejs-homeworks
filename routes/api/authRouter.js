const express = require("express");
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
} = require("../../controllers/authControllers");
const { asyncWrapper } = require("../../helper/apiHelpers");
const {
  authTokenCheckMiddleware,
} = require("../../middlewares/authTokenCheck");
const {
  validationRegistration,
  validationLogin,
  validationSub,
} = require("../../middlewares/validation");

const router = express.Router();

router.use(authTokenCheckMiddleware);

router.post(
  "/signup",
  validationRegistration,
  asyncWrapper(registrationController)
);

router.post("/login", validationLogin, asyncWrapper(loginController));

router.get("/logout", asyncWrapper(logoutController));

router.get("/current", asyncWrapper(getCurrentUserController));

router.patch("/", validationSub, asyncWrapper(updateSubscriptionController));

module.exports = router;
