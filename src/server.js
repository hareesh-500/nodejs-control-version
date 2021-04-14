const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbConnection = require("../DB/connection");
const path = require("path");
const dbPath = path.join(__dirname, "../DB");
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
});

// Db connection
dbConnection();
app.use(express.static(dbPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(upload.array());
app.listen(3000, () => {
  console.log("app is running on port 3000");
});
app.use("/", require("../router/route"));
