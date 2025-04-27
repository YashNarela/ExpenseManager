const jwt = require("jsonwebtoken");

const User = require("../models/user");

require("dotenv").config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);

   
    
    const { fullname, email, password } = req.body;

    

       const profileImageUrl = req.file 

       console.log(profileImageUrl);
       

if (!fullname || !email || !password) {
  return res.status(400).json({ msg: "All fields are required" });
}


    const existingUser = await User.findOne({ email });

    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({ msg: "Email Already exists" });
    }

    const user = await User.create({
      fullName:  fullname,
      email,
      password,
      profilepic: profileImageUrl,
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

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ msg: "Unable To Signup", error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: "Unable To Signup", error: error.message });
  }
};
