const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECERT);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {

     
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
