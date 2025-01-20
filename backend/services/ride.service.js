const rideModel = require("../models/ride.model");

const crypto = require("crypto");

function getOtp(num) {
  function generateOtp(num) {
    // Ensure num is 4 to always generate a four-digit OTP
    num = 4;

    // Generate a random integer between 1000 and 9999
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num));

    return otp.toString(); // Convert OTP to a string
  }

  return generateOtp(num);
}

// Example usage
// This will always print a 4-digit OTP

module.exports.createRide = async ({ user, pickup, destination }) => {
  // Validate input
  if (!user || !pickup || !destination) {
    throw new Error("All fields are required");
  }

  try {
    // Create a new ride
    const ride = await rideModel.create({
      user,
      pickup,
      destination,
      otp: getOtp(4), // Generate a four-digit OTP for the ride
    });

    // Return the created ride
    return ride;
  } catch (error) {
    // Handle and throw the error for the calling function
    throw new Error(`Failed to create ride: ${error.message}`);
  }
};
