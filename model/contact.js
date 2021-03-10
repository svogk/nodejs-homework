const Contact = require("./schemas/contact");

const listContacts = async (userId) => {
  try {
    const results = await Contact.find({ owner: userId }).populate({
      path: "owner",
      select: "name email",
    });
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId, userId) => {
  try {
    const result = await Contact.findOne({
      _id: contactId,
      owner: userId,
    }).populate({
      path: "owner",
      select: "name email",
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId, userId) => {
  try {
    const result = await Contact.findByIdAndRemove({
      contactId,
      owner: userId,
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const result = await Contact.create(body);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body, userId) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      { contactId, owner: userId },
      { ...body },
      { new: true }
    );
    return result;
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
