// const userModel = require("../models/user.model");
// const userService = require("../services/user.service");
// const { validationResult } = require("express-validator");
// const blackListTokenModel = require("../models/blacklistToken.model");
// module.exports.registerUser = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   console.log(req.body);
//   const { fullname, email, password } = req.body;
//   const hashedPassword = await userModel.hashPassword(password);
//   const isUserAlready = await userModel.findOne("email");
//   if (isUserAlready) {
//     return res.status(409).json({ message: "User already exists" });
//   }
//   const user = await userService.createUser({
//     firstname: fullname.firstname,
//     lastname: fullname.lastname,
//     email,
//     password: hashedPassword,
//   });
//   const token = user.generateAuthToken();
//   res.status(201).json({ token, user });
// };

// module.exports.loginUser = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { email, password } = req.body;
//   const user = await userModel.findOne({ email }).select("+password");
//   if (!user) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }
//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }
//   const token = user.generateAuthToken();
//   res.cookie("token", token);
//   res.status(200).json({ token, user });
// };

// module.exports.getUserProfile = async (req, res, next) => {
//   res.status(200).json(req.user);
// };

// module.exports.logoutUser = async (req, res, next) => {
//   res.clearCookie("token");
//   const token = req.cookies.token || req.headers.authorization.split(" ")[1];
//   await blackListTokenModel.create({ token });
//   res.status(200).json({ message: "Logged out successfully" });
// };
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  const { fullname, email, password } = req.body;

  // Check if the user already exists using the email
  const isUserAlready = await userModel.findOne({ email });
  if (isUserAlready) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Hash the password before storing
  const hashedPassword = await userModel.hashPassword(password);

  // Create the new user
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  // Generate JWT token
  const token = user.generateAuthToken();

  // Respond with the token and user data
  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Find the user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = user.generateAuthToken();

  // Set token in cookie and respond
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  // Return the user profile data
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  // Clear the token cookie
  res.clearCookie("token");

  // Get the token from the request headers or cookies
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  // Add the token to the blacklist
  await blackListTokenModel.create({ token });

  // Respond with a success message
  res.status(200).json({ message: "Logged out successfully" });
};
