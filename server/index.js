const express = require("express");
const cors = require("cors");
const { connectDb } = require("./connection/connect");
const authroutes = require("./routers/authRoutes");

const incomeRoutes = require("./routers/incomeRoutes");

const expenseRoutes = require("./routers/expenseRoutes");

const dashboardRoutes = require("./routers/dashboardRoutes");

const path=require("path")
var bodyParser = require("body-parser");

const app = express();

require("dotenv").config();

app.use(cors());

var jsonParser = bodyParser.json();

app.use(jsonParser);
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 4000;

app.use("/api/v1/auth", authroutes);

app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

connectDb();
