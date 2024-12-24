const mongoose = require("mongoose"); // Importing Mongoose for database interaction
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Importing jwt for token generation

// Define the schema for a captain
const captainSchema = new mongoose.Schema({
  fullname: {
    // Nested object for full name
    firstname: {
      type: String, // First name must be a string
      required: true, // First name is required
      minlength: [3, "Firstname must be at least 3 characters"], // Validation for minimum length
    },
    lastname: {
      type: String, // Last name must be a string
      minlength: [3, "Last name must be at least 3 characters"], // Validation for minimum length
    },
  },
  email: {
    type: String, // Email must be a string
    required: true, // Email is required
    unique: true, // Email must be unique in the database
    lowercase: true, // Automatically converts the email to lowercase
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"], // Regex to validate email format
  },
  password: {
    type: String, // Password must be a string
    required: true, // Password is required
    select: false, // Prevent password from being returned in queries by default
  },
  socketId: {
    type: String, // Socket ID for real-time communication
  },
  status: {
    type: String, // Status of the captain (active/inactive)
    enum: ["active", "inactive"], // Allowed values
    default: "inactive", // Default status is inactive
  },
  vehicle: {
    // Nested object for vehicle details
    color: {
      type: String, // Vehicle color must be a string
      required: true, // Color is required
      minlength: [3, "Color must be at least 3 characters"], // Validation for minimum length
    },
    plate: {
      type: String, // Vehicle plate number must be a string
      required: true, // Plate number is required
      minlength: [6, "Plate must be at least 6 characters"], // Validation for minimum length
    },
    capacity: {
      type: Number, // Vehicle capacity must be a number
      required: true, // Capacity is required
      min: [1, "Capacity must be at least 1"], // Minimum capacity validation
    },
    vehicleType: {
      type: String, // Type of vehicle must be a string
      required: true, // Vehicle type is required
      enum: ["auto", "toto"], // Allowed values: auto or toto
    },
    location: {
      // Nested object for vehicle location
      lat: {
        type: Number, // Latitude of the vehicle's location
      },
      lng: {
        type: Number, // Longitude of the vehicle's location
      },
    },
  },
});

// Method to generate an authentication token for a captain
captainSchema.methods.generateAuthToken = function () {
  // Generates a JWT with captain ID and a secret key
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });
  return token; // Returns the generated token
};

// Method to compare a plain text password with the hashed password
captainSchema.methods.comparePassword = async function (password) {
  // Uses bcrypt to compare the passwords
  return await bcrypt.compare(password, this.password);
};

// Static method to hash a password before saving it
captainSchema.statics.hashPassword = async function (password) {
  // Hashes the password with a salt round of 10
  return await bcrypt.hash(password, 10);
};

// Create a model for the captain schema
const captainModel = mongoose.model("captain", captainSchema);

// Export the model for use in other parts of the application
module.exports = captainModel;
