// Note model 
// 

// require mongoose
var mongoose = require('mongoose');

// create the note schema class
var Schema = mongoose.Schema;

// create the note schema class
var noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    // date
    date: {
        type: Date,
        default: Date.now
    },
    // note text
    noteText: String
});
// create note model
var Note = mongoose.model("Note", noteSchema);

// export the note model
module.exports = Note;
