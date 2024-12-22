const userModel = require("../models/user.model"); // user model ko import kiya for database operations

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  // Ensure all required fields are provided
  if (!firstname || !email || !password) {
    throw new Error("Please provide all required fields"); // Agar required fields missing hain, toh error throw karo
  }

  // User object ko database me create karne ke liye userModel ka create method use kiya
  const user = await userModel.create({
    fullname: {
      firstname, // User ka firstname set kiya
      lastname, // User ka lastname set kiya
    },
    email, // User ka email set kiya
    password, // User ka password set kiya
  });

  // User object return kiya
  return user;
};
