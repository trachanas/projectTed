const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const datas = require("./routes/api/datas")
const Products = require("./models/Products");
const Users = require("./models/User")
const History = require("./models/History");

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

app.post("/api/history/add", (req , res) =>
    History.findOne({UserID: req.body.UserID}).then((res) => {
      if (!res){


      const node = new History({
        UserID: req.body.UserID,
        Products: [{productID: req.body.productID, timesViewed : 1}]
      })
      node.save();
      //  History.insert({UserID: req.body.UserID, Products: [{productID: req.body.productID, timesViewed : 1}]})
      }else{
      History.updateOne({UserID: req.body.UserID} , { "$set": { "Products.$.productID": req.body.productID }}, {upsert : true})

      }
    })
)

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


app.post("/api/datas/addBid", (req , res) => {
  const newBid = new Products({
    Category: req.body.Category,
    Bids: req.body.Bids,
    Seller: req.body.Seller,
    ItemID: req.body.ItemID,
    Name: req.body.Name,
    Currently: req.body.Currently,
    First_Bid: req.body.First_Bid,
    Number_of_Bids: req.body.Number_of_Bids,
    Location: req.body.Location,
    Latitude: req.body.Latitude,
    Longitude: req.body.Longitude,
    Country: req.body.Country,
    Started: req.body.Started,
    Ends: req.body.Ends,
    Description: req.body.Description,

  })  

  newBid.save().then(user => res.json(user))
  .catch(err => console.log(err));
})


app.delete("/api/users/delete/:id", (req , res) => {
  const id = req.params.id;
  Users.deleteOne({ _id: id }).then(() => {
      res.json({ ok: true });
  });
})

app.put("/api/users/accept/:id", (req , res) => {
  const id = req.params.id;
  Users.updateOne({_id : id} , { $set: {isAccepted: true}})
})

app.put("/api/datas/update" , (req , res) => {
    const query = Object.keys(req.body)
    console.log(query.toString());
    console.log(query);
  
    //database.collection("datas").findOneAndUpdate({ItemID: query.toString()}, { $set : {Name : "aek"}})
}

)
//csapp.put('/quotes', (req, res) => {  db.collection('quotes')  .findOneAndUpdate({name: 'Yoda'}, {    $set: {      name: req.body.name,      quote: req.body.quote    }  }, {    sort: {_id: -1},    upsert: true  }, (err, result) => {    if (err) return res.send(err)    res.send(result)  })})



const port = process.env.PORT || 6000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));