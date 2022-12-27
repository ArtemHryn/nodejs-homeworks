const express = require("express");

const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateContactFavoriteByIdController,
} = require("../../controllers/contactsControllers");
const { asyncWrapper } = require("../../helper/apiHelpers");
const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateContactFavorite,
} = require("../../middlewares/validation");

const router = express.Router();

router.get("/", asyncWrapper(listContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", validateAddContact, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.put("/:contactId", validateUpdateContact, asyncWrapper(updateContactController));

router.patch(
  "/:contactId/favorite", validateUpdateContactFavorite,
  asyncWrapper(updateContactFavoriteByIdController)
);

module.exports = router;
