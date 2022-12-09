const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");


const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return data;
}

const getContactById = async (contactId) => {
   const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
   return data.find((contact) => contact.id === contactId);
}

const removeContact = async (contactId, res) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const result = data.filter((contact) => contact.id !== contactId);
    if (data.length === result) {
      return false
    }
    await fs.writeFile(
      contactsPath,
      JSON.stringify(result),
      "utf8"
    );
    return true
  } catch (error) {
    return res.status(500).json({"message": "Internal Error"})
  }
}

const addContact = async (body, res) => {
    try {
      const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
      const newContact = {id: uid(2), ...body }
      data.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
      return newContact
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
}

const updateContact = async (contactId, body, res) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const index = data.findIndex(contact => contact.id === contactId)
    if (index === -1) {
      return false
    }
    data.splice(index, 1, { id: contactId , ...body })
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    return data[index]
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
