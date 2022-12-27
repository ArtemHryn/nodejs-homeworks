const { NotFoundContact, FailedToUpdate } = require("../helper/errors");
const { Contact } = require("../models/contactsModel");

const getContacts = async () => {
  return await Contact.find({}, {__v: 0});
};

const getContactById = async (id) => {
  const contact = Contact.findById(id, { __v: 0 });
  if (!contact) throw new NotFoundContact(`contact ${id} not found`);
  return contact;
};

const removeContactById = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  return contact;
};

const addContact = async (body) => {
  const contact = new Contact(body);
  return await contact.save();
};

const updateContactByID = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, { $set: body })
  if(!contact) throw new FailedToUpdate('Please, check data')
}

const updateContactFavoriteById = async (id, favorite) => {
  const contact = await Contact.findByIdAndUpdate(id, { $set: { favorite } })
  if (!contact) throw new FailedToUpdate('Please, check contact id')
  return contact
}

module.exports = {
  getContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactByID,
  updateContactFavoriteById,
};
