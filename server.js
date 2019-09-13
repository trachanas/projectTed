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
  
  Products.aggregate([{ $limit: 100 }]).then((data) => {
    res.json( data );
  });
});

const buildTerm = (term) => new RegExp(`\\.*${term}\\.*`);

app.post("/api/datas/search", (req , res) => {

  const query = 
    Object
      .keys(req.body)
      .reduce((acc, key) => 
        ({ ...acc, [key]: buildTerm(req.body[key])}),
        {});
    console.log(query)
  Products.find(query).then((data) => res.json(data));
})



app.put("/api/datas/update" , (req , res) => {
    const query = Object.keys(req.body)
    console.log(query.toString());
    console.log(query);
    
    database.collection("datas").findOneAndUpdate({ItemID: query.toString()}, { $set : {Name : "aek"}})

}

)
//csapp.put('/quotes', (req, res) => {  db.collection('quotes')  .findOneAndUpdate({name: 'Yoda'}, {    $set: {      name: req.body.name,      quote: req.body.quote    }  }, {    sort: {_id: -1},    upsert: true  }, (err, result) => {    if (err) return res.send(err)    res.send(result)  })})



const port = process.env.PORT || 6000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));