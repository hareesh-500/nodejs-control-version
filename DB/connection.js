const mongoose = require("mongoose");
const DB_URI =
  "mongodb+srv://hareesh:hareesh@123@cluster0.w8gco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbConnection = async () => {
  await mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongodb..."))
    .catch((err) => console.log(err));
};

module.exports = dbConnection;
