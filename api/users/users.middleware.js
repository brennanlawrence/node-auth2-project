const { findByName } = require("./users-model");
const bcrypt = require("bcryptjs");
const { jwtSecret } = require("../../config/secrets");
const jwt = require("jsonwebtoken");

function checkBody(req, res, next) {
  const body = req.body;

  if (!body.username || !body.password || !body.department) {
    res.status(400).json({
      message: "Oops, new user needs a username, password, and department",
    });
  } else {
    next();
  }
}

async function authUser(req, res, next) {
  const body = req.body;
  const allegedUser = await findByName(body.username);

  if (allegedUser && bcrypt.compareSync(body.password, allegedUser.password)) {
    req.user = allegedUser;
    next();
  } else {
    res.status(400).json({ message: "You shall not pass!" });
  }
}

function tokenAuth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ err: "VALID token required" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ err: "You shall not pass" });
  }
}



module.exports = { checkBody, authUser, tokenAuth };
