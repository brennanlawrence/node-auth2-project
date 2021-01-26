const db = require("../../data/db-config");
const e = require("express");

module.exports = {
  find,
  findByName,
  add,
};

const query = db("users");

function find() {
  return query;
}

function findByName(username) {
  //SELECT * FROM users WHERE username = "sadhbh";
  return query.where("username", username).then((res) => {
    return(res[0]);
  });
}

function add(user) {
  /*
  INSERT INTO users (username, password, department)
  VALUES ("simon", "ofk3j3094", "Gardaí");
  */

  return query
    .insert({
      "username": user.username,
      "password": user.password,
      "department": user.department,
    });
}



