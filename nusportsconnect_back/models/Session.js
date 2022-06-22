const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sessionSchema = new Schema({

    sport : { type : String, required : true},
    location : { type : String, required : true},
    date : {type: Date, required: true},
    start : {type: Date, required: true},
    end : {type: Date, required: true}, 
    participant : { type : Number, required : true},
    star : { type : Number, required : true}
}, {
    timestamps : true
})

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;