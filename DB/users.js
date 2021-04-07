const mongoose = require("mongoose");
const validator = require("validator");

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    validate(value) {
      if (value <= 10) throw new Error("age must be grater then 10");
    },
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("email is not valid");
    },
  },
});
const user = mongoose.model("user", schema);

module.exports = user;
