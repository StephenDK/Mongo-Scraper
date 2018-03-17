// This controller finds, deletes, and updates headlines
// require models 

var db = require('../models');

module.exports = {
    // find all articles and sort them by date
    findAll: function(req, res) {
        db.Headline
        .find(req.query)
        .sort({ date: -1 })
        .then(function(dbHeadline) {
            res.json(dbHeadline);
        });
    },
    // Delete a specific headline
    delete: function(req, res) {
        db.Headline.remove({ _id: req.params.id }).then(function(dbHeadline) {
            res.json(dbHeadline);
        });
    },
    // update specific headline
    update: function(req, res) {
        db.Headline.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .then(function(dbHeadline) {
            res.json(dbHeadline);
        })
    }
};