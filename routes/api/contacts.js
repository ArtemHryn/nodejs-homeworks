const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const {
  validateAddContact,
  validateUpdateContact,
} = require("../../middlewares/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.post("/", validateAddContact, async (req, res, next) => {
  const result = await addContact(req.body, res);

  res.status(201).json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(req.params.contactId, res);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", validateUpdateContact, async (req, res, next) => {
  const result = await updateContact(req.params.contactId, req.body, res);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

module.exports = router;
