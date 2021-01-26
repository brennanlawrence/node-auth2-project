const express = require("express");
const userRoute = require("./users/users-router");
const server = express();

server.use(express.json());

server.use("/api/users", userRoute);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server listening" });
});


module.exports = server;