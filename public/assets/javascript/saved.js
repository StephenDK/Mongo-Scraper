/* global bootbox */
$(document).ready(function() {
    // Getting a reference to the article container div we will be rendering all articles inside of
    var articleContainer = $(".article-container");
    // Event listeners for dynamically generated buttons
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);
  
    initPage();
  
    function initPage() {
      // Empty the article container, run an AJAX request for any saved headlines
      articleContainer.empty();
      $.get("/api/headlines?saved=true").then(function(data) {
        // If there are headlines, render them to the page
        if (data && data.length) {
          renderArticles(data);
        }
        else {
          // Otherwise render a message explaing we have no articles
          renderEmpty();
        }
      });
    }
  
    function renderArticles(articles) {
      // This function handles appending HTML containing our article data to the page
      var articlePanels = [];
      // Loop through all the articles and create a bootstrap panel
      for (var i = 0; i < articles.length; i++) {
        articlePanels.push(createPanel(articles[i]));
      }
      // append article panels to the container
      articleContainer.append(articlePanels);
    }
  
    function createPanel(article) {
      // This panel takes in the article and creates a panel 
      var panel = $(
        [
          "<div class='panel panel-default'>",
          "<div class='panel-heading'>",
          "<h3>",
          "<a class='article-link' target='_blank' href='" + article.url + "'>",
          article.headline,
          "</a>",
          "<a class='btn btn-danger delete'>",
          "Delete From Saved",
          "</a>",
          "<a class='btn btn-info notes'>Article Notes</a>",
          "</h3>",
          "</div>",
          "<div class='panel-body'>",
          article.summary,
          "</div>",
          "</div>"
        ].join("")
      );
      // We attach the article's id to the jQuery element
      panel.data("_id", article._id);
      // return the constructed panel jQuery element
      return panel;
    }
  
    function renderEmpty() {
      // This function renders some HTML to the page 
      var emptyAlert = $(
        [
          "<div class='alert alert-warning text-center'>",
          "<h4>There are no saved articles.</h4>",
          "</div>",
          "<div class='panel panel-default'>",
          "<div class='panel-heading text-center'>",
          "<h3>Would You Like to Browse Available Articles?</h3>",
          "</div>",
          "<div class='panel-body text-center'>",
          "<h4><a href='/'>Browse Articles</a></h4>",
          "</div>",
          "</div>"
        ].join("")
      );
      // Appending this data to the page
      articleContainer.append(emptyAlert);
    }
  
    function renderNotesList(data) {
      // This function handles rendering note list items to our notes modal
      var notesToRender = [];
      var currentNote;
      if (!data.notes.length) {
        // If we have no notes, just display a message explaing this
        currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
        notesToRender.push(currentNote);
      }
      else {
        // If we do have notes, go through each one
        for (var i = 0; i < data.notes.length; i++) {
          // Constructs an li element to contain our noteText and a delete button
          currentNote = $(
            [
              "<li class='list-group-item note'>",
              data.notes[i].noteText,
              "<button class='btn btn-danger note-delete'>x</button>",
              "</li>"
            ].join("")
          );
          // Store the note id on the delete button for easy access when trying to delete
          currentNote.children("button").data("_id", data.notes[i]._id);
          // Adding our currentNote to the notesToRender array
          notesToRender.push(currentNote);
        }
      }
      // Now append the notesToRender to the note-container inside the note modal
      $(".note-container").append(notesToRender);
    }
  
    function handleArticleDelete() {
      // This function handles deleting articles/headlines
      var articleToDelete = $(this).parents(".panel").data();
      $.ajax({
        method: "DELETE",
        url: "/api/headlines/" + articleToDelete._id
      }).then(function(data) {
        if (data.ok) {
          initPage();
        }
      });
    }
  
    function handleArticleNotes() {
      // This function handles opending the notes modal and displaying our notes
      // We grab the id of the article to get notes for from the panel element the delete button sits inside
      var currentArticle = $(this).parents(".panel").data();
      // Grab any notes with this headline/article id
      $.get("/api/notes/" + currentArticle._id).then(function(data) {
        // Constructing our initial HTML to add to the notes modal
        var modalText = [
          "<div class='container-fluid text-center'>",
          "<h4>Notes For Article: ",
          currentArticle._id,
          "</h4>",
          "<hr />",
          "<ul class='list-group note-container'>",
          "</ul>",
          "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
          "<button class='btn btn-success save'>Save Note</button>",
          "</div>"
        ].join("");
        // Adding the formatted HTML to the note modal
        bootbox.dialog({
          message: modalText,
          closeButton: true
        });
        var noteData = {
          _id: currentArticle._id,
          notes: data || []
        };
        
        $(".btn.save").data("article", noteData);
        renderNotesList(noteData);
      });
    }
  
    function handleNoteSave() {
      // This function handles what happens when a user tries to save a new note for an article
      var noteData;
      var newNote = $(".bootbox-body textarea").val().trim();
      // If we have data typed into the note input field, format it
      // and post it to the "/api/notes" route and send the formatted noteData as well
      if (newNote) {
        noteData = {
          _id: $(this).data("article")._id,
          noteText: newNote
        };
        $.post("/api/notes", noteData).then(function() {
          // When complete, close the modal
          bootbox.hideAll();
        });
      }
    }
  
    function handleNoteDelete() {
      // This function handles the deletion of notes
      // First we grab the id of the note we want to delete
      // We stored this data on the delete button when we created it
      var noteToDelete = $(this).data("_id");
      $.ajax({
        url: "/api/notes/" + noteToDelete,
        method: "DELETE"
      }).then(function() {
        // When done, hide the modal
        bootbox.hideAll();
      });
    }
  });
  