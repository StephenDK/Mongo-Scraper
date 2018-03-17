import { Promise } from 'mongoose';

// Require our Dependencies
var express = require('express');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

// Setup our port 
var PORT = process.env.PORT || 3000;

// set express instance to app variable
var app = express();

// Require routes 
// var routes = require('./routes');

// Set the public directory as static
app.use(express.static('public'));

// set express to use handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// have all requests go through our routes
app.use(routes);

// connection to mongo
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});