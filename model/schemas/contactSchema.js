const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Enter your email"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Enter your phone"],
      unique: true,
    },
    subscription: {
      type: String,
      default: "free",
      enum: ["free", "pro", "premium"],
    },
    password: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
  },

  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
