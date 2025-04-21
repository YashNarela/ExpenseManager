const express = require("express");

const upload = require("../middleware/fileUploaderMulter");

const route = express.Router();

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authcontroller");

const { protect } = require("../middleware/protect.middleware");

route.post("/register", registerUser);

route.post("/login", loginUser);

route.get("/getuser", protect, getUserInfo);

route.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }


  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;


  console.log(req.protocol);
  console.log(req.get("host"));
  
  console.log(imageUrl);

  res.status(200).json({ imageUrl });
});

module.exports = route;
