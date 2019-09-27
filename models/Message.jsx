const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MesSchema = new Schema({
    message: String,
    sender: String,
    receiver: String
});


Messages = mongoose.model('messages', MesSchema);

module.exports = Messages;