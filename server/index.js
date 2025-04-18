const express = require("express");
const cors = require("cors");
const { connectDb } = require("./connection/connect");
const authroutes = require("./routers/authRoutes");
var bodyParser = require("body-parser");

const app = express();

require("dotenv").config();

app.use(cors());

var jsonParser = bodyParser.json();

app.use(jsonParser);
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);


const port = process.env.PORT || 4000;

app.use("/api/v1/auth", authroutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

connectDb();
