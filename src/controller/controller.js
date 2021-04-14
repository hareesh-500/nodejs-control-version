const User = require("../../DB/users");
const category = require("../../DB/category");
const product = require("../../DB/product");
const jwt = require("jsonwebtoken");
const upload = require("../../DB/uploadFile");
require("dotenv/config");
const { ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");

//inserting user data
exports.insertData = async (req, res) => {
  var userData = {};
  const { firstname, mobileNumber, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    var hashedPassword = await bcrypt.hash(password, salt);
  } catch {
    return res.status(500).send("Error while generating hashed password");
  }
  userData.firstname = firstname;
  userData.mobileNumber = mobileNumber;
  userData.email = email;
  userData.password = hashedPassword;
  const insert = new User(userData);
  await insert
    .save()
    .then(() => {
      res.json({ message: "user added successfully", user: insert });
    })
    .catch(({ message }) => {
      res.send(message);
    });
};

//inserting category data
exports.insertCategoryData = async (req, res) => {
  const uploadResponse = await upload(req.file.path);
  let imageData = JSON.parse(uploadResponse);
  console.log(imageData.extras.ImageID);
  let categoryData = {};
  categoryData.name = req.body.name;
  categoryData.image = imageData.extras.ImageID;
  const insert = new category(categoryData);
  await insert
    .save()
    .then(() => {
      res.json({ message: "category added successfully", category: insert });
    })
    .catch(({ message }) => {
      res.send(message);
    });
};

//inserting product data
exports.insertProductData = async (req, res) => {
  const uploadResponse = await upload(req.file.path);
  let imageData = JSON.parse(uploadResponse);
  console.log(imageData.extras.ImageID);
  let productData = {};
  productData.name = req.body.name;
  productData.image = imageData.extras.ImageID;
  productData.price = req.body.price;
  productData.categoryId = req.body.categoryId;
  const insert = new product(productData);
  await insert
    .save()
    .then(() => {
      res.json({ message: "product added successfully", product: insert });
    })
    .catch(({ message }) => {
      res.send(message);
    });
};

//getting users data
exports.getUsers = async (req, res) => {
  var limit = parseInt(req.query.limit);
  console.log(typeof limit);
  User.find()
    .limit(limit)
    .then((users) => {
      res.send(users);
    });
};

//getting category data
exports.getCategory = async (req, res) => {
  var limit = 10;
  if (req.query.limit) limit = parseInt(req.query.limit);
  console.log(typeof limit);
  category
    .find()
    .limit(limit)
    .then((categories) => {
      res.send(categories);
    });
};

//getting product data
exports.getProduct = async (req, res) => {
  var limit = 10;
  if (req.query.limit) limit = parseInt(req.query.limit);
  console.log(typeof limit);
  product
    .find()
    .limit(limit)
    .then((products) => {
      res.send(products);
    });
};

// deleting users data
exports.deleteUsers = async (req, res) => {
  category.collection
    .deleteMany(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//deleting category data
exports.deleteCategory = async (req, res) => {
  category.collection
    .deleteMany(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//deleting product data
exports.deleteProduct = async (req, res) => {
  product.collection
    .deleteMany(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//user login
exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const data = await User.collection.findOne({ email: email });

    if (await bcrypt.compare(password, data.password)) {
      const token = jwt.sign({ _id: data._id }, process.env.SECRET_KEY);
      let num = "1234567890";
      let otp = "";
      for (let i = 0; i < 4; i++) {
        otp += num[Math.floor(Math.random() * 10)];
      }
      res.header("auth-token", token).send("Your otop is " + otp);
      process.env.OTP = otp;
      exports.otp;
    } else {
      res.send("password incorrect");
    }
  } catch (err) {
    res.send("user not registered");
  }
};

//updating user data
exports.updateUser = async (req, res) => {
  console.log("ssssssssss");
  const { id, name } = req.body;
  if (!id) return res.json({ message: "For update user you need to pass id" });
  if (!name)
    return res.json({ message: "For update user you need to pass values" });
  let query = { _id: ObjectID(id) };
  let newvalues = { $set: { name: name } };
  console.log(query, newvalues);
  User.collection.updateOne(query, newvalues, (err, result) => {
    if (err) return res.json({ messae: "you need to pass values to update" });
    res.send(result);
  });
};

//updating category data
exports.updateCategory = async (req, res) => {
  const { id, name } = req.body;
  let categoryImg = undefined;
  if (req.file) categoryImg = req.file.fieldname;

  console.log(req.file);
  if (!id)
    return res.json({ message: "For update category you need to pass id" });
  let upteValues = {};
  if (name) upteValues.name = name;
  if (categoryImg) {
    const uploadResponse = await upload(req.file.path);
    let imageData = JSON.parse(uploadResponse);
    upteValues.image = imageData.extras.ImageID;
  }
  console.log("upteValues", upteValues);
  const query = { _id: ObjectID(id) };
  const newvalues = { $set: upteValues };
  console.log(query, newvalues);
  category.collection.updateOne(query, newvalues, (err, result) => {
    if (err) return res.json({ messae: "you need to pass values to update" }); //res.send(err);
    res.send(result);
  });
};

//updating product data
exports.updateProduct = async (req, res) => {
  const { id, name, price, categoryId } = req.body;
  let productImg = undefined;
  let upteValues = {};
  if (!id)
    return res.json({ message: "For update category you need to pass id" });
  if (name) upteValues.name = name;
  if (price) upteValues.name = price;
  if (categoryId) upteValues.name = categoryId;
  if (req.file) productImg = req.file.fieldname;
  if (productImg) {
    const uploadResponse = await upload(req.file.path);
    let imageData = JSON.parse(uploadResponse);
    upteValues.image = imageData.extras.ImageID;
  }
  const query = { _id: ObjectID(id) };
  const newvalues = { $set: upteValues };
  console.log(query, newvalues);
  product.collection.updateOne(query, newvalues, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
};

// getting total user
exports.getUserCount = async (req, res) => {
  User.count({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

//verify otp
exports.verifyOtp = async (req, res) => {
  const otp = req.body.otp;
  if (!otp) return res.send("enter otp");
  if (otp == process.env.OTP) res.send("login scucessfull");
  else res.send("incorrect otp");
};
