const mongoose = require("mongoose");
const validator = require("validator");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
});
const category = mongoose.model("category", schema);

module.exports = category;
