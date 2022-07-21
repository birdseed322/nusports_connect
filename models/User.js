const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const notificationSchema = require('./Notification')
const Schema = mongoose.Schema;

//Information to be stored in a session datatype.
const userSchema = new Schema({
    username : { type : String, required : true},
    password : {type : String, required : true},
    email : {type : String, required : true},
    tokenVersion : {type : Number, default : 0},
    fName : {type: String, required : true},
    lName : {type : String, required : true},
    interests : {type: String, default: ""},
    image: { type: String, default:"" },
    ratings : {type : [Number], required : true, default: [5]},
    reviews: { type: [ObjectId], default: [], required : true },
    currentSessions : {type : [ObjectId], default: [], required : true},
    notifications : {type: [notificationSchema], default: [], required : true},
    lastLoggedIn : {type: Date, default: new Date()}
}, {
    timestamps : true
})

const User = mongoose.model('User', userSchema);

module.exports = User;