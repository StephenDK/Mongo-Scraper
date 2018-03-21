
$(document).ready(function() {
    // Refernece to container where data will go
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
  
    // When page is ready run initialize page
    initPage();
  
    function initPage() {
      // Empty container and run ajax get request
      articleContainer.empty();
      $.get("/api/headlines?saved=false").then(function(data) {
        // Render articles
        if (data && data.length) {
          renderArticles(data);
        }
        else {
          // message explaing no articles
          renderEmpty();
        }
      });
    }
  
    // Append html containing our article to page
    function renderArticles(articles) {
      
      var articlePanels = [];
      
      // Pass every article and create a panel for each article
      for (var i = 0; i < articles.length; i++) {
        articlePanels.push(createPanel(articles[i]));
      }
      // Append articles to container on page
      articleContainer.append(articlePanels);
    }
  
    function createPanel(article) {
      // This function creates a panel for each article that  is passed to it
      var panel = $(
        [
          "<div class='panel panel-default'>",
          "<div class='panel-heading'>",
          "<h3>",
          "<a class='article-link' target='_blank' href='" + article.url + "'>",
          article.headline,
          "</a>",
          "<a class='btn btn-success save'>",
          "Save Article",
          "</a>",
          "</h3>",
          "</div>",
          "<div class='panel-body'>",
          article.summary,
          "</div>",
          "</div>"
        ].join("")
      );
      // Attach article id to JQuery element
      panel.data("_id", article._id);
      return panel;
    }
  
    function renderEmpty() {
      // This function alerts user of no articles to be found 
      var emptyAlert = $(
        [
          "<div class='alert alert-warning text-center'>",
          "<h4>No new articles. SORRY.</h4>",
          "</div>",
          "<div class='panel panel-default'>",
          "<div class='panel-heading text-center'>",
          "<h3>What Would You Like To Do?</h3>",
          "</div>",
          "<div class='panel-body text-center'>",
          "<h4><a class='scrape-new'>Scrape New Articles</a></h4>",
          "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
          "</div>",
          "</div>"
        ].join("")
      );
      // Appending this data to the page
      articleContainer.append(emptyAlert);
    }
  
    function handleArticleSave() {
      // This function is triggered when the user saves an article
      var articleToSave = $(this)
        .parents(".panel")
        .data();
      articleToSave.saved = true;
      
      $.ajax({
        method: "PUT",
        url: "/api/headlines/" + articleToSave._id,
        data: articleToSave
      }).then(function(data) {
        // If the data was saved successfully
        if (data.saved) {
          // reload the entire list of articles
          initPage();
        }
      });
    }
  
    function handleArticleScrape() {
      // This function handles clicking any "scrape new article" buttons
      $.get("/api/fetch").then(function(data) {
        
        initPage();
        bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
      });
    }
  });
  