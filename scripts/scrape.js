/*
 This script will run the scrape function
that grabs website data.
*/

// Dependencies
var request = require('request');
var cheerio = require('cheerio');

// message to show scrape working
console.log("\n***********************\n" + 
"Grabing every thread name and link\n" +
" from the reddit webdev board\n" 
+ "***************************");

var scrape = function() {

    request("https://gizmodo.com/", function(error, response, html) {

    // load the html into cheerio
    var $ = cheerio.load(html);

    // empty array to hold the data
    var results = [];

    // find each p-tag with the headline "class" using cheerio
        $("p.headline").each(function(i, element) {
            
            // save the title into a variable
            var title = $(element).text();

            // In the currently selected element grab the href 
            var link = $(element).children().attr("href");

            // Save the results into an object and push into results array
            results.push({
                title: title,
                link: link
            });
        });
        // log the results 
        console.log(results);
    })
}
// export the scrape function
module.exports = scrape;
