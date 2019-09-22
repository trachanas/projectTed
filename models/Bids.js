const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BidSchema = new Schema({
    ItemID: String,
    Name: String,
    Category: [],
    Currently: Number,
    First_Bid: Number,
    Buy_Price: Number,
    Number_of_Bids: Number,
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


Bids = mongoose.model('bids', BidSchema);

module.exports = Bids;