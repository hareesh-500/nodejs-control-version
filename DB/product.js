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
  categoryId: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
});
const product = mongoose.model("product", schema);

module.exports = product;
