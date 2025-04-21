const express = require("express");
const route = express.Router();
const upload = require("../middleware/fileUploaderMulter");


const {
  addExpense,
  getExpense,
  deleteExpense,
  downloadExpense,
} = require("../controllers/expensecontroller");

const { protect } = require("../middleware/protect.middleware");

route.post("/add", protect, addExpense);

route.get("/get", protect, getExpense);

route.get("/download", protect, downloadExpense);

route.delete("/:id", protect, deleteExpense);






module.exports = route;
