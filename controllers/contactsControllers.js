const {
  getContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactByID,
  updateContactFavoriteById,
} = require("../services/contactServices");

const listContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  let { page = 1, limit = 5, ...filters } = req.query;
  limit = parseInt(limit) > 10 ? 10 : parseInt(limit);
  const skip = page * limit - limit;
  const contacts = await getContacts(owner, { skip, limit }, filters);
  res.json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await getContactById(contactId, owner);
  res.status(200).json({ contact });
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const deletedContact = await removeContactById(contactId, owner);
  res.json({ message: `${deletedContact.name} has been deleted ` });
};

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;

  const newContact = await addContact(req.body, owner);
  res
    .status(201)
    .json({ message: `${newContact.name} contact has been created` });
};

const updateContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  await updateContactByID(contactId, owner, req.body);
  res.status(200).json({ message: "Contact has been updated" });
};

const updateContactFavoriteByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;

  const contact = await updateContactFavoriteById(contactId, favorite, owner);
  res.json({ data: { ...contact._doc, favorite } });
};

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateContactFavoriteByIdController,
};
