const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : { type : String, required : true},
    password : {type : String, required : true},
    email : {type : String, required : true},
    tokenVersion : {type : Number, default : 0},
    fName : {type: String, required : true},
    lName : {type : String, required : true},
    currentSessions : {type : [ObjectId], default: [], required : true}
}, {
    timestamps : true
})

const User = mongoose.model('User', userSchema);

module.exports = User;