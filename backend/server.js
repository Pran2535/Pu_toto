const dotenv = require("dotenv");
dotenv.config(); // dotenv ka matlab hai ki hamne dotenv file ka access kar liya hai and dotenv.config() function ka matlab ye hai ki yaha par dotenv file ke sare variable access hona start kar diye hai
const http = require("http"); // yaha par hamne http ko require kiya hai jisse hame server banane me kafi help hogi
const app = require("./app");
const cors = require("cors");
const port = process.env.PORT || 3000;
app.use(cors()); // app.use cors se hame ye benefit milta hai ki jo bhi request hai woh hum sari websites se le rahe honge na ki ek se abhi development ke time jab code production pe jaiega waha par hum ye cors ke ander particular domain add kar denge jo ki hame help karega
// sirf usi domain ka data access ho naki sab ka

const server = http.createServer(app); // yaha par hamne server banaia hai jisse ki http ka ek method hai .createserver usse

server.listen(port, () => {
  console.log(`server is listening on ${port}`); // bhai dekh hamne yaha par server bana liya hai jisme ki ek function pass kiye hai jo ki hame console pe print kar ke de raha hai ki yaha par kya aan rha hai matlab kis port pe hamara server listen kar rha ho
}); // hum server banaienge jisme ki listen function me port number dal diya jaiega and then hamara server kaam karega
// but hum directly server ko listen port par nahi kar sakte hai toh hum ek kaam karenge dotenv package install karenge and then dotenv package se hum ek environment file banaienge jiska naam ho ga .env and is file me hum maximum chije jaise ki
// api keys bagaira hai rakhenge so  that ki koi bhi use direct access na kar pai
// and hamne sath hi me ek cors package install kiya hai cors ka basically kaam ye hai ki ye cross origin resources ko share karne me help karta hai and then hum me help karta hai ki resources ko share kiye ja sake thik
//  hame sabse pehle apne code me ek gitignore file banani hogi
// gitignore file hame help karta hai ki ye jo bhi files hamare pass mentioned hoti hai gitignore me woh nahi jaiega commit ke sath github pe so that no one has access to our public repo env files
