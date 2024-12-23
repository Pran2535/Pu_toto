const express = require("express"); // express module ko require karo
//  ye module hame help karta hai server banane me
const cookieParser = require("cookie-parser");
const app = express();

// ek app naam ka variable banate hai jisme humne express function ko dala hai
const connectToDb = require("./db/db");
connectToDb();

// Middlewares ko pehle define karo, routes se pehle
app.use(express.json());
app.use(cookieParser()); // cookieParser ko pehle move kiya
app.use(express.urlencoded({ extended: true }));

// Routes ko middlewares ke baad define karo
const userRoutes = require("./routes/user.routes");

app.get("/", (req, res) => {
  res.send("hello pranav bhai backend sikh rahe ho ");
});

app.use("/user", userRoutes);

module.exports = app;
