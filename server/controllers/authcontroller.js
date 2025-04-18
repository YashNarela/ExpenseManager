const jwt = require("jsonwebtoken");

const User = require("../models/user");

require("dotenv").config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);

    const { fullName, email, password, profilepic } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "Email Already exists" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profilepic,
    });

    console.log(user);

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ msg: "Unable To Signup", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return React.status(400).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({
      id: _id.user,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ msg: "Unable To Signup", error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
  } catch (error) {}
};
