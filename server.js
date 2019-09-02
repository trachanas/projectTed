const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");
const users = require("./routes/api/users");

const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
      console.log("MongoDB successfully connected");

      // const fs = require('fs');
      // const XmlStream = require('xml-stream');
      // const stream = fs.createReadStream('items-27.xml');
      // const xml = new XmlStream(stream);
      //
      // let i = 1;
      //
      // xml.on('data', function(label) {
      //
            // Model here
      //     Model.insert(label, { upsert:true }, (err, doc) => {
      //         if(err) {
      //             process.stdout.write(err + "\r");
      //         } else {
      //             process.stdout.write(`Saved ${i} entries..\r`);
      //             i++;
      //         }
      //     });
      // });
      //
      // xml.on('end', function() {
      //     console.log('end event received, done');
      // });
  })
  .catch(err => console.log(err));

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

const port = process.env.PORT || 6000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));