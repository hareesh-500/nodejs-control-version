const express = require("express");
const router = express.Router();
const controller = require("../src/controller/controller");
const verfyAuth = require("../src/verifytoken");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});
const categoryUpload = multer({ storage: storage }).single("categoryImg");
const productUpload = multer({ storage: storage }).single("productImg");

// home route
router.get("/", verfyAuth, (req, res) => {
  res.send("hai..");
});

// inserting data into user collection
router.post("/insert/user", controller.insertData);

// inserting data into category collection
router.post(
  "/insert/category",
  verfyAuth,
  categoryUpload,
  controller.insertCategoryData
);

// inserting data into product collection
router.post(
  "/insert/product",
  verfyAuth,
  productUpload,
  controller.insertProductData
);

// getting data from user collection
router.get("/users", verfyAuth, controller.getUsers);

// getting data from catagory collection
router.get("/category", verfyAuth, controller.getCategory);

// getting data from catagory collection
router.get("/product", verfyAuth, controller.getProduct);

// deleting data from user collection
router.delete("/delete/user", verfyAuth, controller.deleteUsers);

// user login
router.post("/user/login", controller.login);

//delete category
router.delete("/delete/category", verfyAuth, controller.deleteCategory);

//delete product
router.delete("/delete/product", verfyAuth, controller.deleteProduct);

// getting data from category collection
router.get("/category", verfyAuth, controller.getCategory);

// updating user data
router.put("/update/user", verfyAuth, controller.updateUser);

// updating category data
router.put(
  "/update/category",
  categoryUpload,
  verfyAuth,
  controller.updateCategory
);

// updating product data
router.put(
  "/update/product",
  productUpload,
  verfyAuth,
  controller.updateProduct
);

//User count
router.get("/users/count", verfyAuth, controller.getUserCount);

//verify otp
router.post("/otp", verfyAuth, controller.verifyOtp);

// sending error message
router.get("*", (req, res) => {
  res.status(404).send(`requesting url "${req.url}" is not found`);
});

module.exports = router;
