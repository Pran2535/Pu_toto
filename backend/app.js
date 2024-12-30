const express = require("express"); // express module ko require karo
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Import CORS
const app = express();

// Database connection
const connectToDb = require("./db/db");
connectToDb();

// Use middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies if needed
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");

app.get("/", (req, res) => {
  res.send("hello pranav bhai backend sikh rahe ho");
});

app.use("/user", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
