// This db model is for headline
// 

// Require mongoose
var mongoose = require('mongoose');

// creat a new schema
var Schema = mongoose.Schema;

// Headline schema
var headlineSchema = new Schema({
    // for the headline, a string must be entered
    headline: {
        type: String,
        required: true,
        unique: { index: { unique: true }}
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: Boolean,
        default: false
    }
});

// Create a headline model
var Headline = mongoose.model("Headline", headlineSchema);

// export headline schema
module.exports = Headline;