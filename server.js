const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const datas = require("./routes/api/datas")
const Products = require("./models/Products");
const Users = require("./models/User")
const History = require("./models/History");
const validateAddBid = require("./validation/addBid");


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
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/datas", datas);

app.get("/api/products/all", (req, res) => {
  
  Products.aggregate([{ $limit: 2000 }]).then((data) => {
    res.json( data );
  });
});

const buildTerm = (term) => new RegExp(`\\.*${term}\\.*`);

// app.post("/api/history/add", (req , res) =>
//     History.findOne({UserID: req.body.UserID}).then((res) => {
//       if (!res){
//
//
//       const node = new History({
//         UserID: req.body.UserID,
//         Products: [{productID: req.body.productID, timesViewed : 1}]
//       })
//       node.save();
//       //  History.insert({UserID: req.body.UserID, Products: [{productID: req.body.productID, timesViewed : 1}]})
//       }else{
//         History.updateOne({UserID: req.body.UserID} , { "$set": { "Products.$.productID": req.body.productID }}, {upsert : true})
//       }
//     })
// );

app.post("/api/datas/search", (req , res) => {

  const query = 
    Object
      .keys(req.body)
      .reduce((acc, key) => 
        ({ ...acc, [key]: buildTerm(req.body[key])}),
        {});

  Products.find(query).then((data) => res.json(data));
});

app.post("/api/datas/addBid", (req , res) => {
    const { errors, isValid } = validateAddBid(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newBid = new Data({
        ItemID: req.body.ItemID,
        Name:   req.body.Name,
        Category: req.body.Category,
        Currently: req.body.Currently,
        First_Bid: req.body.First_Bid,
        Buy_Price: req.body.Buy_Price,
        Number_of_Bids: req.body.Number_of_Bids,
        Bids: [],
        Location: req.body.Location,
        Latitude: req.body.Latitude,
        Longitude:  req.body.Longitude,
        Country: req.body.Country,
        Started: req.body.Started,
        Ends: req.body.Ends,
        Seller: req.body.Seller,
        Description: req.body.Description
    });

    newBid.save().then((r) => res.json(r));
});

app.delete("/api/users/delete/:id", (req , res) => {
  const id = req.params.id;
  Users.deleteOne({ _id: id }).then(() => {
      res.json({ ok: true });
  });
});

app.put("/api/users/accept/:id", (req , res) => {
  const id = req.params.id;
  Users.updateOne({_id : id} , { $set: {isAccepted: true}}).then(res => console.log(res))
});

app.get("/api/users/getUser/:user", (req , res) => {
    Users.findOne({username: req.params.user}).then(user => res.json(user))
});


app.put("/api/datas/update/:id" , (req , res) => {

    const { Location, Country, Rating, UserID, Amount, Time} = req.body.Bid[0];

    database.collection("datas").findOneAndUpdate({ItemID: req.params.id}, { $push: {Bids : {
        Location: Location,
        Country: Country,
        Rating: Rating,
        UserID: UserID,
        Amount: Amount,
        Time:   Time
    }}})
    let current = 0;
    let newCur = 0;

    database.collection("datas").findOneAndUpdate({ItemID: req.params.id} , { $inc: { Number_of_Bids : 1 }});
    database.collection("datas").findOne({ItemID: req.params.id}).then((r) => {
      current = r.Currently
    });

    setTimeout(() => {
        if (Amount > current){
            database.collection("datas").findOneAndUpdate({ItemID: req.params.id} , {$set : {Currently: Amount}})
        }
        console.log(current)
    }, 1000);


});

//db.inventory.update( { "carrier.fee": { $gt: 2 } }, { $set: { price: 9.99 } } )

const port = process.env.PORT || 6000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));