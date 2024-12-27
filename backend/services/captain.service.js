const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required"); // Validate required fields
  }

  // Check if a captain with the same email already exists
  const existingCaptain = await captainModel.findOne({ email });
  if (existingCaptain) {
    throw new Error("Captain with this email already exists");
  }

  // Hash the password
  // const hashedPassword = await captainModel.hashPassword(password);

  // Create a new captain with vehicle information
  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return captain; // Return the created captain
};
