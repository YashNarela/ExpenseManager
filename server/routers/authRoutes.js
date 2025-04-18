const express = require("express");

const route = express.Router();

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authcontroller");

route.post("/register", registerUser);

route.post("/login", loginUser);

route.get("/user",getUserInfo);

module.exports = route;
