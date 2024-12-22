const mongoose = require("mongoose"); // mongoose module ko require kiya for database connection

function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECT, {})
    .then(() => {
      console.log("Connected to the database"); // Agar connection successful hai toh ye message show karega
    })
    .catch((err) => {
      console.error("Database connection failed:", err.message); // Agar error hai toh ye message show karega
    });
}

module.exports = connectToDb; // is function ko export karte hai taaki dusri files me use ho sake
