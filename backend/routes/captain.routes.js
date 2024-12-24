const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name should be atleast 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color should be atleast 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate should be atleast 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least one "),
    body("vehicle.vehicleType")
      .isIn(["auto", "toto"])
      .withMessage("invalid vedhicle"),
  ],
  captainController.registerCaptain
);
module.exports = router;
