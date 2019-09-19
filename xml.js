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
    Currently: Number,
    First_Bid: Number,
    Number_of_Bids: Number,
    Bids: [],
    Location: String,
    Longitude: String,
    Latitude: String,
    Country: String,
    Started: String,
    Ends: String,
    Seller: [],
    Description: String
});

let  i = 0;

const convertStringToNumber = (string) => {
    string = string.replace("$","");
    return parseFloat(string);
}



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
	}) => ({ Location, Country, Rating, UserID, Time, Amount: convertStringToNumber(Amount)});

const formatBids = (item = []) => Array.isArray(item) ? item.map(formatBid) : [formatBid(item)];


json.Items.Item.forEach((item) => {
    //console.log(item)

    var longitude =  item.Location._attributes === undefined ? "0" : item.Location._attributes.Longitude;
    var latitude = item.Location._attributes === undefined ? "0" : item.Location._attributes.Latitude;



    var buy = item["Buy_Price"] === undefined ? 0 : convertStringToNumber(item["Buy_Price"]._text);

    var currently = convertStringToNumber(item["Currently"]._text);
    var firstBid = convertStringToNumber(item["First_Bid"]._text);
    var numberOfBids = convertStringToNumber(item["Number_of_Bids"]._text);

    console.log(currently + " " + firstBid);
	const { 
		_attributes: { ItemID },
        Name: { _text: Name },
        Category,
        Currently,
        Buy_Price,
        First_Bid,
        Number_of_Bids,
        Bids,
        Location: { _text: Location},
        Latitude,
        Longitude,
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
        Currently: currently,
        Buy_Price: buy,
		First_Bid: firstBid,
        Number_of_Bids: numberOfBids,
        Bids: formatBids(Bids.Bid),
        Location,
        Latitude: latitude,
        Longitude: longitude,
		Country,
		Started,
		Ends,
		Seller: {
			Rating, 
			UserID,
        },
        Description,
	};


 console.log(newItem);

    productData = new data({
        ItemID: newItem.ItemID,
        Name: newItem.Name,
        Category: newItem.Category,
        Currently: newItem.Currently,
        First_Bid: newItem.First_Bid,
        Number_of_Bids: newItem.Number_of_Bids,
        Bids: newItem.Bids,
        Location: newItem.Location,
        Latitude: newItem.Latitude,
        Longitude: newItem.Longitude,
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
