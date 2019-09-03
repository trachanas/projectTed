const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
var GenerateSchema = require('generate-schema')

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

const Schema = mongoose.Schema;

// Create Schema
var UserSchema = new Schema({
  Name: String,
  
});



var fs = require('fs');
var XmlStream = require('xml-stream');
      /*
         * Pass the ReadStream object to xml-stream
      */
var stream = fs.createReadStream('items-27.xml');
var xml = new XmlStream(stream);

xml.preserve('Items', true);
xml.collect('subitem');

xml.on('endElement: Items', function(item) {

   console.log(item)
  var data = mongoose.model("data",UserSchema);

  dataUser = new data({
    Name: item.Name
  })

  dataUser.save(function(err){
    if (err) throw err;
    console.log("Ok")
  })
});
    //s = mongoose schema
   // var s = new 
//     UserSchema = GenerateSchema.mongoose(item)
//  console.log("11" + typeof UserSchema)
//    var dataUser = mongoose.model('data', UserSchema);
// //   dataUser = s;
// //   var u = new dataUser();
//  dataUser.save(function(err){
//     if(err) throw err;
//     console.log("OK")
//   }); 
  
//})


      
































  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

const port = process.env.PORT || 6000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));