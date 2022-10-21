const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

const getUserById = async (req, res, next) => {
  const { user } = req.body;
  let userData;
  try {
    userData = await User.findById(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  return res.status(200).json({ user: userData });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ message: "Signup Successfully", user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Couldn't Find User By this Email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
  const { canvasUrl, ...other } = existingUser._doc;
  return res.status(200).json({ message: "Login Successfully", user: other });
};

const updateUrl = async (req, res, next) => {
  const { user, canvasUrl } = req.body;
  let existingUser;
  try {
    existingUser = await User.findByIdAndUpdate(user, {
      canvasUrl,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Couldn't Find User By this Email" });
  }

  return res.status(200).json({ message: "url added", user: existingUser });
};

module.exports = { getAllUser, signup, login, updateUrl, getUserById };
