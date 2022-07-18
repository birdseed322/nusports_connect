const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Information to be stored in a session datatype.
const sessionSchema = new Schema({
    sport : { type : String, required : true},
    location : { type : String, required : true},
    description : { type : String, required : true},
    startTime : {type: Date, required: true},
    endTime : {type: Date, required: true}, 
    maxParticipant : { type : Number, required : true},
    minStar : { type : Number, required : true},
    host : {type : ObjectId, required : true},
    participants : { type: [ObjectId], default : []}
}, {
    timestamps : true
})

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;