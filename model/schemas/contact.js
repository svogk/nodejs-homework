const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false, timestamps: true }
);

contactSchema.plugin(mongoosePaginate);
const Contact = model("contact", contactSchema);

module.exports = Contact;
