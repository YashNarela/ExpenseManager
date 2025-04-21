const express = require("express");

const upload = require("../middleware/fileUploaderMulter");

const route = express.Router();

const {getDashboardData}=require("../controllers/dashboardcontroller")
const { protect } = require("../middleware/protect.middleware");


route.get("/", protect, getDashboardData);



module.exports = route;
