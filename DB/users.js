const mongoose = require("mongoose");
const validator = require("validator");

const schema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("enter a valid mobile number");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("email is not valid");
    },
  },
  password: {
    type: String,
    rrequired: true,
    trim: true,
  },
});
const user = mongoose.model("user", schema);

module.exports = user;
