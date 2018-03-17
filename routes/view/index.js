var router = require('express').Router();

// render homepage
router.get('/', function(req, res) {
    res.render('home');
});

// render saved handlebar page
router.get('/saved', function(req, res) {
    res.render('saved');
});

module.exports = router;