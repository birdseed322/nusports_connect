const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    message : {type: String, required : true},
    link : {type: String}
}, {
    timestamps : true
})

module.exports = notificationSchema;