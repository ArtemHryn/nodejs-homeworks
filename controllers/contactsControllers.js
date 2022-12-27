const {
  getContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactByID,
  updateContactFavoriteById,
} = require("../services/contactServices");

const listContactsController = async (req, res, next) => {
  const contacts = await getContacts();
  res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.status(200).json({ contact });
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await removeContactById(contactId);
  res.json({ message: `${deletedContact.name} has been deleted ` });
};

const addContactController = async (req, res, next) => {
  const newContact = await addContact(req.body);
  console.log(newContact);
  res
    .status(201)
    .json({ message: `${newContact.name} contact has been created` });
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  await updateContactByID(contactId, req.body);
  res.status(200).json({ message: "Contact has been updated" });
};

const updateContactFavoriteByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const {favorite} = req.body
  const contact = await updateContactFavoriteById(contactId, favorite);
  res.json({data: {...contact._doc, favorite}})
}

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateContactFavoriteByIdController,
};
