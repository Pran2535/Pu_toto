const express = require("express"); // express module ko require karo
//  ye module hame help karta hai server banane me

const app = express();

// ek app naam ka variable banate hai jisme humne express function ko dala hai
const connectToDb = require("./db/db");
connectToDb();
const userRoutes = require("./routes/user.routes");
app.get("/", (req, res) => {
  res.send("hello pranav bhai backend sikh rahe ho ");
});
app.use(express.json());
app.use("/user", userRoutes);
app.use(express.urlencoded({ extended: true }));
// app.get ek route hai jiska kaam yaahi hai ki woh hame us route par hone wali sara data supply karega
// i mean with a function jo ki request and response le raha hai and  response me bhej raha hai ki hello pranab backend sikh rahe ho
// module.exports(app); maine pehle ye dala tha jisme module.exports ke ander function tha jo ki galat t
// tarike se export kiya gaya hai and then ab main sahi tarika bataunga
module.exports = app;
