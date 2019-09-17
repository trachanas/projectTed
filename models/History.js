const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    UserID: String,
    Products: Array
});

module.exports = History = mongoose.model('history', DataSchema);