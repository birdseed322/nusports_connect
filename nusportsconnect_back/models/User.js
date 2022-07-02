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
    interests : {type: String},
    ratings : {type : Number, required : true, default: 5},
    img: { data: Buffer, contentType: String },
    currentSessions : {type : [ObjectId], default: [], required : true},
    historySessions : {type : [ObjectId], default: [], required : true}
}, {
    timestamps : true
})

const User = mongoose.model('User', userSchema);

module.exports = User;