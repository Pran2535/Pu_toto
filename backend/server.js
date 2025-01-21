const dotenv = require("dotenv");
dotenv.config();
// dotenv ka matlab hai ki hamne dotenv file ka access kar liya hai
// and dotenv.config() function ka matlab ye hai ki yaha par dotenv file ke sare variable access hona start kar diye hai
const { initializeSocket } = require("./socket");
const http = require("http");
// yaha par hamne http ko require kiya hai jisse hame server banane me kafi help hogi

const app = require("./app");
const cors = require("cors");

const port = process.env.PORT || 3000;
// agar process.env.PORT available hai toh use karenge, nahi toh default 3000 port use hoga

app.use(cors());
// app.use cors se hame ye benefit milta hai ki development ke time hum sari websites se request le sakte hain
// production me hum cors me specific domains allow karenge jo ki sirf authorized resources ko access karne denge

const server = http.createServer(app);
// yaha par hamne server banaya hai http module ke .createServer method ka use karke, jo humare app ko handle karega

initializeSocket(server); // initialize socket.io server with our http server

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
// server.listen method se hum server ko specific port par listen karwa rahe hain
// aur ek callback function se confirm kar rahe hain ki server successfully chal raha hai

// but hum directly sensitive data (e.g., API keys, port numbers, etc.) code me nahi likhte
// isliye dotenv ka use karke ek .env file banate hain jo sensitive information store karti hai

// sath hi hame apne project folder me ek .gitignore file banani chahiye
// .gitignore file me hum .env file mention karte hain taaki .env file commit na ho
// aur sensitive data public GitHub repos me leak na ho
