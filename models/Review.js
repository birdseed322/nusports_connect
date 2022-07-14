const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer : { type : ObjectId, required : true },
    reviewee : { type : ObjectId, required : true },
    rating : { type : Number, required : true },
    comment: { type: String, required: true }
}, {
    timestamps : true
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;