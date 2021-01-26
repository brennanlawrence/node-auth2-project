const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");
const { checkBody, authUser, tokenAuth } = require("./users.middleware");
const User = require("./users-model");

const router = express.Router();

router.post("/register", checkBody, (req, res, next) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  User.add(credentials)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.post("/login", authUser, (req, res, next) => {
  const token = generateToken(req.user);
  res.status(200).json({
    message: `Welcome ${req.user.username}, have a token...`,
    token,
  });
});

router.get("/", tokenAuth, (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}
module.exports = router;
