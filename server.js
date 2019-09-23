const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const datas = require("./routes/api/datas");
const Products = require("./models/Products");
const Bids = require("./models/Bids");
const Users = require("./models/User");
const History = require("./models/History");
const validateAddBid = require("./validation/addBid");
const fs = require('fs');
const Lsh = require('@agtabesh/lsh')
var XMLWriter = require('xml-writer');


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

app.post("/api/history/add", (req , res) =>
    History.findOne({ UserID: req.body.UserID }).then((res) => {

        if (!res){

          const node = new History({
            UserID: req.body.UserID,
            Products: [{productID: req.body.productID, timesViewed : 1}]
          });

          node.save();
      } else {

          History.findOne({ UserID: req.body.UserID }).then((result) => {

              const found = result.Products.find(({ productID }) => productID === req.body.productID);

              let newP;

              if (found) {
                  newP = result.Products.reduce((acc, val) => {

                      if (val.productID === req.body.productID) return acc.concat({
                          ...val,
                          timesViewed: val.timesViewed + 1
                      });

                      return acc.concat(val);
                  }, []);
              }

              else newP = result.Products.concat({ productID: req.body.productID, timesViewed: 1 });
              //console.log(newP[0].timesViewed);

              History.findOneAndUpdate(
                  { UserID: req.body.UserID },
                  { $set: { "Products": newP } },
                  { useFindAndModify: false },
              ).then((res) => {
                  //console.log(res);
              });
          });
      }
    })
);

//    database.collection("datas").findOneAndUpdate({ItemID: req.params.id} , { $inc: { Number_of_Bids : 1 }});
app.post("/api/datas/search", (req , res) => {

  const query =
    Object
      .keys(req.body)
      .reduce((acc, key) =>
        ({ ...acc, [key]: buildTerm(req.body[key])}),
        {});

  Products.find(query).then((data) => res.json(data));
});

app.post("/api/bids/addBid", (req , res) => {

    const newBid = new Bids({
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


const convertXML = (bid) => {
    let xw = new XMLWriter;

   // xw.startDocument();
    //xw.startElement('Items');
    xw.startElement("Item");
    xw.writeAttribute('ItemID', bid.ItemID);

    //Name
    xw.startElement("Name");
    xw.text(bid.Name);
    xw.endElement();

    //Category
    bid.Category.forEach(item => {
        it = (item.split(', '));
        it.forEach(i =>{
            xw.startElement("Category");
            xw.text(i);
            xw.endElement();
        });
    });

    //Currently
    xw.startElement("Currently");
    xw.text(bid.Currently);
    xw.endElement();

    //First_Bid
    xw.startElement("First_Bid");
    xw.text(bid.First_Bid);
    xw.endElement();

    //Buy_Price
    let buy = bid.Buy_Price === undefined ? 0 : bid.Buy_Price;
    xw.startElement("Buy_Price");
    xw.text(buy);
    xw.endElement();

    //Number_of_Bids
    xw.startElement("Number_of_Bids");
    xw.text(bid.Number_of_Bids);
    xw.endElement();

    //Bids
    if (bid.Bids.length === 0){
        xw.startElement("Bids");
        xw.endElement();
    }else {
        xw.startElement("Bids");
        bid.Bids.forEach(item => {
            xw.startElement("Bid");
            xw.startElement("Bidder");
            xw.writeAttribute("Rating", item.Rating);
            xw.writeAttribute("UserID", item.UserID);
            xw.startElement("Location");
            xw.text(item.Location);
            xw.endElement();

            xw.startElement("Country", item.Country);
            xw.text(item.Country);
            xw.endElement();

            xw.endElement();

            xw.startElement("Time");
            xw.text(item.Time);
            xw.endElement();

            xw.startElement("Amount");
            xw.text(item.Amount);
            xw.endElement();

            xw.endElement();

        });
        xw.endElement();
    }

    //Location
    xw.startElement("Location");

    let lat = bid.Latitude === undefined ? 0 : bid.Latitude;
    let lng = bid.Longitude === undefined ? 0 : bid.Longitude;

    xw.writeAttribute("Latitude", lat);
    xw.writeAttribute("Longitude", lng);
    xw.text(bid.Location);
    xw.endElement();

    //Country
    xw.startElement("Country");
    xw.text(bid.Country);
    xw.endElement();

    //Started
    xw.startElement("Started");
    xw.text(bid.Started);
    xw.endElement();

    //Ends
    xw.startElement("Ends");
    xw.text(bid.Ends);
    xw.endElement();

    //Seller
    xw.startElement("Seller");
    xw.writeAttribute('UserID', bid.Seller[0].UserID);
    xw.writeAttribute('Rating', bid.Seller[0].Rating);
    xw.endElement();

    //Description
    xw.startElement("Description");
    xw.text(bid.Description);
    xw.endElement();


    xw.endDocument();
    return xw.toString();
};


app.get("/api/bids/alltoXML", (req, res) => {
    let xw = new XMLWriter;

    let format = require('xml-formatter');

    Bids.find().then((bids) => {
        let string  = '';
        xw.startElement('Items');

        bids.forEach((bid) => {
            string = convertXML(bid) + string;
        });

        string = "<Items>" + string + "</Items>"

        var options = {collapseContent: true};

        let formattedXml = format(string , options);

        const xmlString = JSON.stringify(bids, null, 2);
        fs.writeFile('./Bids.xml', formattedXml, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        });
    });
});


app.get("/api/bids/alltoJson", (req, res) => {
   Bids.find().then((bids) => {
       const jsonString = JSON.stringify(bids, null, 2);
       fs.writeFile('./Bids.json', jsonString, err => {
           if (err) {
               console.log('Error writing file', err)
           } else {
               console.log('Successfully wrote file')
           }
       });
       res.json(bids);
   });
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
        Number_of_Bids: 0,
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
  Users.updateOne({_id : id} , { $set: {isAccepted: true}}).then(() => {
      res.json({ ok: true });
  });
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
    }}});

    database.collection("bids").findOneAndUpdate({ItemID: req.params.id}, { $push: {Bids : {
                Location: Location,
                Country: Country,
                Rating: Rating,
                UserID: UserID,
                Amount: Amount,
                Time:   Time
    }}});

    let current = 0;
    let newCur = 0;

    database.collection("datas").findOneAndUpdate({ItemID: req.params.id} , { $inc: { Number_of_Bids : 1 }});
    database.collection("datas").findOne({ItemID: req.params.id}).then((r) => {
        current = r.Currently;
        res.json(r);
    });

    database.collection("bids").findOneAndUpdate({ItemID: req.params.id} , { $inc: { Number_of_Bids : 1 }});
    database.collection("bids").findOne({ItemID: req.params.id}).then((r) => {
        if(r !== null){
            current = r.Currently;
            //res.json(r);
        }
    });

    setTimeout(() => {
        if (Amount > current){
            database.collection("datas").findOneAndUpdate({ItemID: req.params.id} , {$set : {Currently: Amount}})
        }
    }, 1000);

    setTimeout(() => {
        if (Amount > current){
            database.collection("bids").findOneAndUpdate({ItemID: req.params.id} , {$set : {Currently: Amount}})
        }
    }, 1000);

});



app.get("/api/bids/recommend/:id", (req, res) => {

    let sorted;
    let rec;
    let recID;
    let mostViewed;
    let retValue = [];

    History.find({UserID:req.params.id}).then(data => {
        //console.log(JSON.stringify(data));
        data.forEach(r => {
            //console.log(r.Products[1]);
            sorted = r.Products.sort((a, b) => (a.timesViewed > b.timesViewed) ? -1 : 1);
        });
        rec = sorted.slice(0 , 1);
        rec.forEach(r => {
            recID = r.productID;
        });
    }).then(()  => {

        Products.find({_id : recID}).then((res) => {
            mostViewed = (res);

            Products.find().then((r) => {
                let documents = r.map(v => JSON.stringify(v));

                const config = {
                    storage: 'memory',
                    shingleSize: 5,
                    numberOfHashFunctions: 120
                };
                const lsh = Lsh.getInstance(config);

                for (let i = 0; i < 10; i += 1) {
                    lsh.addDocument(i, documents[i])
                }

                const q = {
                    text: JSON.stringify(mostViewed),
                };

                const result = lsh.query(q)

                result.slice(0,1).map(i => {
                    retValue.push((documents[i]));
                });
                //console.log(retValue);
                return retValue;
            })
        })
    })
});

// Products.find().then((res) => {
//     let documents = res.map(v => JSON.stringify(v));
//     documents.forEach(s =>{
//         console.log(s);
//         console.log("\n\n\n\n\n\n\n");
//     })
//     const config = {
//         storage: 'memory',
//         shingleSize: 5,
//         numberOfHashFunctions: 120
//     };
//
//     const lsh = Lsh.getInstance(config);
//
//     for (let i = 0; i < 10; i += 1) {
//         lsh.addDocument(i, documents[i])
//     }
//
//     const q = {
//         text: documents[0],
//     };
//
//     //const result = lsh.query(q)
//     console.log(result);
//
//     result.slice(0,5).map(v => {
//         console.log(JSON.parse(documents[v]));
//         }
//     );
//
//     // console.log(JSON.parse(documents[0]));
//     // console.log(JSON.parse(documents[6]));
// });



const port = process.env.PORT || 6000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));