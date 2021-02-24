const fs = require("fs/promises");
const { v4: uuid } = require("uuid");

const path = require("path");
const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(allContacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    return allContacts.find((contact) => contact.id.toString() === contactId);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const newListContacts = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(newListContacts));
    return listContacts();
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const allContacts = await listContacts();
    const newContact = { id: uuid(), ...body };
    allContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(
      (contact) => contact.id.toString() === contactId
    );
    if (index === -1) return;
    allContacts[index] = { ...allContacts[index], ...body };
    fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts[index];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
