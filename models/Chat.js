const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    room : {type : String, required : true},
    author : {type : String, required : true},
    message : {type : String, required : true}
}, {
    timestamps : true
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;