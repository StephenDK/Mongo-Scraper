// Controller for the notes
// require models
var db = require('../models');

module.exports = {
    // find one note 
    findOne: function(req, res) {
        db.Note
        .findOne(req.query)
        .then(function(dbNote) {
            res.json(dbNote);
        });
    },
    // create a new note 
    create: function(req, res) {
        db.Note
        .create(req.body)
        .then(function(dbNote) {
            res.json(dbNote);
        });
    },
    // delete a note 
    delete: function(req, res) {
        db.Note
        .remove({ _id: req.params.id })
        .then(function(dbNote) {
            res.json(dbNote); 
        });
    }
};