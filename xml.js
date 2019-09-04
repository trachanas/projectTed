const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const fs = require('fs');
const convert = require('xml-js');

var args = process.argv;

const xml = fs.readFileSync(args[2], 'UTF-8');
const json = convert.xml2js(xml, { compact: true, spaces: 2 });

//console.log(xml)


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
var DataSchema = new Schema({
    ItemID: String,
    Name: String,
    Category: [],
    Currently: String,
    First_Bid: String,
    Number_of_Bids: String,
    Bids: [],
    Location: String,
    Country: String,
    Started: String,
    Ends: String,
    Seller: [],
    Description: String
});

let  i = 0;

var data = mongoose.model("data",DataSchema);

const formatBid = 
	({ 
		Bidder: { 
			_attributes: { Rating, UserID }, 
			Location: { _text: Location } = {},
			Country: { _text: Country } = {},
		},
		Time: { _text: Time },
		Amount: { _text: Amount },
	}) => ({ Location, Country, Rating, UserID, Time, Amount });

const formatBids = (item = []) => Array.isArray(item) ? item.map(formatBid) : [formatBid(item)];


json.Items.Item.forEach((item) => {
        // console.log(    item["First_Bid"]["_text"]       
        // )
      
    var buy = item["Buy_Price"] === undefined ? "0" : item["Buy_Price"]["_text"]

    //console.log(buy)

	const { 
		_attributes: { ItemID },
        Name: { _text: Name },
        Category,
        Currently: { _text: Currently},
        Buy_Price,
		First_Bid: { _text: First_Bid },
        Number_of_Bids: { _text: Number_of_Bids },
        Bids,
		Location: { _text: Location },
		Country: { _text: Country },
		Started: { _text: Started },
        Ends: { _text: Ends },
        Seller: { _attributes: { Rating, UserID } },
		Description: { _text: Description },
		
	} = item;
    


	const newItem = {
		ItemID,
        Name,
        Category: Category.map(({ _text }) => _text),
        Currently,
        Buy_Price: buy,
		First_Bid,
        Number_of_Bids,
        Bids: formatBids(Bids.Bid),
		Location,
		Country,
		Started,
		Ends,
		Seller: {
			Rating, 
			UserID,
        },
        Description,
	};


	//console.log(newItem);
//	console.log();

    productData = new data({
        ItemID: newItem.ItemID,
        Name: newItem.Name,
        Category: newItem.Category,
        Currently: newItem.Currently,
        First_Bid: newItem.First_Bid,
        Number_of_Bids: newItem.Number_of_Bids,
        Bids: newItem.Bids,
        Location: newItem.Location ,
        Country: newItem.Country,
        Started: newItem.Started,
        Ends: newItem.Ends,
        Seller: newItem.Seller,
        Description: newItem.Description

  })

  productData.save(function(err){
    if (err) throw err;
  })
i++;

});

console.log("Data saved " + i)
