const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    room : {type : String, required : true},
    message : {type : String, required : true}
}, {
    timestamps : true
})

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;