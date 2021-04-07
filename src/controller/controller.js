const User = require("../../DB/users");

exports.insertData = async (req, res) => {
  if (Array.isArray(req.body)) {
    User.collection.insertMany(req.body, (err, { result }) => {
      if (err) return res.send(err);
      res.send(`${result.n} records inserted`);
    });
  } else {
    const insert = new User(req.body);
    await insert
      .save()
      .then(() => {
        res.send(insert);
      })
      .catch(({ message }) => {
        res.send(message);
      });
  }
};

exports.getUsers = async (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);
  });
};

exports.deleteUsers = async (req, res) => {
  User.collection
    .deleteMany(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
