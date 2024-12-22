const mongoose = require("mongoose"); // mongoose module ko require kiya for defining schema and models
const bcrypt = require("bcrypt"); // bcrypt module ko require kiya for password hashing
const jwt = require("jsonwebtoken"); // jwt module ko require kiya for generating tokens

// User schema define kiya jisme hamne user ke fields define kiye hain
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String, // firstname string type ka hoga
      required: true, // firstname dena mandatory hai
      minlength: [3, "First name must be at least of 3 characters"], // Minimum 3 characters hone chahiye
    },
    lastname: {
      type: String, // lastname string type ka hoga
      minlength: [3, "Last name must be at least of 3 characters"], // Minimum 3 characters hone chahiye
    },
  },
  email: {
    type: String, // email string type ka hoga
    required: true, // email dena mandatory hai
    unique: true, // email unique hona chahiye
    minlength: [5, "Email must be at least 5 characters long"], // Minimum 5 characters hone chahiye
  },
  password: {
    type: String, // password string type ka hoga
    required: true, // password dena mandatory hai
    select: false, // select false ka matlab query me by default password fetch nahi hoga
  },
  socketId: {
    type: String, // socketId string type ka hoga, optional field hai
  },
});

// JWT token generate karne ke liye ek method banaya
userSchema.methods.generateAuthToken = function () {
  // JWT token banaya user ki _id ke basis par, jo secret key se sign hoga
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token; // token return kiya
};

// Password compare karne ke liye ek method banaya
userSchema.methods.comparePassword = async function (password) {
  // bcrypt.compare ka use karke password ko compare karte hain
  return await bcrypt.compare(password, this.password);
};

// Password hash karne ke liye ek static method banaya
userSchema.statics.hashPassword = async function (password) {
  // bcrypt.hash ka use karke password ko hash karte hain, 10 rounds ke sath
  return await bcrypt.hash(password, 10);
};

// User model export karte hain, jo userSchema ko use karta hai
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
