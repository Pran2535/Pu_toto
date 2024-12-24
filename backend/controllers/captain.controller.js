const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure request body
    const { fullname, email, password, vehicle } = req.body;

    // Check if the email already exists
    const isCaptainAlready = await captainModel.findOne({ email });
    if (isCaptainAlready) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    // Create a new captain
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    // Generate authentication token
    const token = captain.generateAuthToken();

    // Send response
    res.status(201).json({ token, captain });
  } catch (error) {
    // Handle errors and pass to the error-handling middleware
    next(error);
  }
};
