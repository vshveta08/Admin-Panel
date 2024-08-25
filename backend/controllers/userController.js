const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/index");

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(409).json({
      success: false,
      msg: "Please fill all the fields.",
    });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        user,
        success: false,
        msg: "This email is already present.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword: ", hashedPassword);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(200).json({
      user,
      success: true,
      msg: "User successfully created",
    });
  } catch (err) {
    console.log("err: ", err);
    return err;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(409).json({
      success: false,
      msg: "Please fill all the fields.",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Email or password is not valid.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        msg: "Email or password is not valid.",
      });
    }

    // generate token
    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET_KEY, {
      expiresIn: "5h",
    });
    console.log("token: ", token);

    res.status(200).json({
      token,
      success: true,
      msg: "User successfully logged in.",
    });
  } catch (err) {
    console.log("err: ", err);
    return err;
  }
};

module.exports = { createUser, login };
