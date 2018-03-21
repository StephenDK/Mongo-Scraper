var axios = require("axios");
var cheerio = require("cheerio");

// This function will scrape NY times
var scrape = function() {
  // Scrape the NYTimes website
  return axios.get("http://www.nytimes.com").then(function(res) {
    var $ = cheerio.load(res.data);
    // Make an empty array to hold data
    var articles = [];

    // Loop through each NY time entry
    $(".theme-summary").each(function(i, element) {
      
      // Headline
      var head = $(this)
        .children(".story-heading")
        .text()
        .trim();

      // URL
      var url = $(this)
        .children(".story-heading")
        .children("a")
        .attr("href");

      // Summary
      var sum = $(this)
        .children(".summary")
        .text()
        .trim();

        // Create an object to push to the articles array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
