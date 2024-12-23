const express = require("express"); // express module ko require kiya for creating routes
const router = express.Router(); // router instance banaya express ka
const userController = require("../controllers/user.controller"); // user controller ko import kiya for handling user-related logic
const { body } = require("express-validator"); // express-validator module se body middleware ko import kiya for request validation

// POST route banaya for user registration
router.post(
  "/register", // "/register" endpoint par request aayegi
  [
    // Validation rules define kiye hain:
    body("email") // email field ko validate karte hain
      .isEmail() // check kiya ki kya email valid hai
      .withMessage("Invalid Email"), // agar email valid nahi hai to error message dena
    body("fullname.firstname") // fullname ke firstname ko validate karte hain
      .isLength({ min: 3 }) // firstname me minimum 3 characters hone chahiye
      .withMessage("First name must be at least 3 characters long"), // error message
    body("password") // password ko validate karte hain
      .isLength({ min: 6 }) // password me minimum 6 characters hone chahiye
      .withMessage("Password must be at least 6 characters long"), // error message
  ],
  userController.registerUser // userController ka registerUser method call hoga
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be of length 6) 6"),
  ],
  userController.loginUser // userController ka loginUser method call hoga
);

// Router ko export karte hain taaki isse hum app me use kar saken
module.exports = router;
