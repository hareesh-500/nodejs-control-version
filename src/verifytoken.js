const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("Acess Denied");
  try {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verify;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

module.exports = auth;
