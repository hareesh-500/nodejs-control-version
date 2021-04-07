const express = require("express");
const router = express.Router();
const controller = require("../src/controller/controller");

// home route
router.get("/", (req, res) => {
  res.send("hai..");
});

// inserting data into user collection
router.post("/insert/user", controller.insertData);

// getting data from user collection
router.get("/users", controller.getUsers);

// deleting data from user collection
router.delete("/delete/user", controller.deleteUsers);

// sending error message
router.get("*", (req, res) => {
  res.status(404).send(`requesting url "${req.url}" is not found`);
});

module.exports = router;
