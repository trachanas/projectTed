const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const datas = require("./routes/api/datas")
const Products = require("./models/Products");

const app = express();
// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// DB Config
const db = require("./config/keys").mongoURI;
mongoose.connect(db,{ useNewUrlParser: true });
console.log("MongoDB successfully connected");

const database = mongoose.connection;

database.on("error", console.error.bind(console, "connection error"));
database.once("open", function(callback) {
     console.log("Connection succeeded.");
});

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/datas", datas)

app.get("/api/products/all", (req, res) => {
  
  Products.aggregate([{ $limit: 10 }]).then((data) => {
    console.log(data)
    res.json( data );
  });
});

const port = process.env.PORT || 6000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));