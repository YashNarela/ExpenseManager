const express = require("express");
const route = express.Router();
const upload = require("../middleware/fileUploaderMulter");

const {
  addIncome,
  getIncome,
  deleteincome,
  downloadIncome,
} = require("../controllers/incomecontroller");

const { protect } = require("../middleware/protect.middleware");

route.post("/add", protect, addIncome);

route.get("/get", protect, getIncome);

route.get("/download", protect, downloadIncome);

route.delete("/:id", protect, deleteincome);

module.exports = route;
