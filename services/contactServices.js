const { NotFoundContact, FailedToUpdate } = require("../helper/errors");
const { Contact } = require("../models/contactsModel");

const getContacts = async (owner, { skip, limit }, filters) => {
  return await Contact.find({ owner, ...filters })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit);
};

const getContactById = async (contactId, owner) => {
  const contact = Contact.findOne({ _id: contactId, owner }).select({ __v: 0 });
  if (!contact) throw new NotFoundContact(`contact ${contactId} not found`);
  return contact;
};

const removeContactById = async (contactId, owner) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    owner,
  }).select({ __v: 0 });
  return contact;
};

const addContact = async (body, owner) => {
  const contact = new Contact({ ...body, owner });
  return await contact.save();
};

const updateContactByID = async (contactId, owner, body) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: body }
  );
  if (!contact) throw new FailedToUpdate("Please, check data");
};

const updateContactFavoriteById = async (contactId, owner, favorite) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: { favorite } }
  );
  if (!contact) throw new FailedToUpdate("Please, check contact id");
  return contact;
};

module.exports = {
  getContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactByID,
  updateContactFavoriteById,
};
