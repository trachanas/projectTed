const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DataSchema = new Schema({
    ItemID: String,
    Name: String,
    Category: [],
    Currently: String,
    First_Bid: String,
    Buy_Price: String,
    Number_of_Bids: String,
    Bids: [],
    Location: String,
    Latitude: String,
    Longitude: String,
    Country: String,
    Started: String,
    Ends: String,
    Seller: [],
    Description: String
});


Data = mongoose.model('datas', DataSchema);

module.exports = Data;