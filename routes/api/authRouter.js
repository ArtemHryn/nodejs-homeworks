const express = require("express");
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
  updateAvatarController,
  verificationController,
  resendVerificationController,
} = require("../../controllers/authControllers");
const { asyncWrapper } = require("../../helper/apiHelpers");
const {
  authTokenCheckMiddleware,
} = require("../../middlewares/authTokenCheck");
const { uploadMiddleware } = require("../../middlewares/avatarMiddleware");
const {
  validationRegistration,
  validationLogin,
  validationSub,
  resendVerificationValidation,
} = require("../../middlewares/validation");

const router = express.Router();

// router.use(authTokenCheckMiddleware);

router.post(
  "/signup",
  [uploadMiddleware.single("avatar"), validationRegistration],
  asyncWrapper(registrationController)
);

router.post("/login", validationLogin, asyncWrapper(loginController));

router.get("/logout", authTokenCheckMiddleware, asyncWrapper(logoutController));

router.get(
  "/current",
  authTokenCheckMiddleware,
  asyncWrapper(getCurrentUserController)
);

router.patch(
  "/",
  [authTokenCheckMiddleware, validationSub],
  asyncWrapper(updateSubscriptionController)
);

router.patch(
  "/avatars",
  [authTokenCheckMiddleware, uploadMiddleware.single("avatar")],
  asyncWrapper(updateAvatarController)
);

router.get("/verify/:verificationToken", asyncWrapper(verificationController));

router.post("/verify", resendVerificationValidation, asyncWrapper(resendVerificationController));

module.exports = router;
