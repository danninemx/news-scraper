$(document).ready(function () {

  //scrape the articles
  $("#scrape-articles").on("click", function (event) {

    $.ajax({
      method: "GET",
      url: "/scrape"
    })
      .then(function (data) {
        console.log(data);
        location.href = ('/');
      })

  });

  // Whenever someone clicks a "make a comment" button
  $("body").on("click", "#make-comment", function (e) {
    e.preventDefault();
    console.log("Trying to get info on article");

    // Save the id from the p tag
    let thisId = $(this).attr("data-id");
    console.log(`\n data-id detected: ${thisId} \n`);

    // Update the save-comment button's data-id with that from this make-comment button
    $('#save-comment').attr('data-id', thisId);
    // debugger;

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function (data) {
        $('#comment-modal').modal('show');
        console.log(`\n Data returned the following note value: ${data.note}\n`);

        // If there's a note in the article
        if (data.note) {
          console.log(`\n This note was found in returned data: ${data.note.body} \n`);

          // Place the body of the note in the body textarea
          $("#comment-input").val(data.note.body);
        } else {
          console.log(`\n No note was found on article w/ data-id of ${thisId}. \n`);
        }
      }).catch(function (err) {
        console.log("Error in make comment in app.js not working: " + err);
      });
  }); // End of comment addition event listener



  // When you click the save-comment button from modal
  $("body").on("click", "#save-comment", function (event) {
    event.preventDefault();

    // Grab the id associated with the article from the submit button
    let thisId = $(this).attr("data-id");
    console.log(`\n Saving comment of ${$('#comment-input').val()} with data-id of: ${thisId} \n`);
    // console.log(`\n Comment-input textarea has :${$("#comment-input").val()} \n`);

    // Hide the comment modal
    $('#comment-modal').modal('hide');

    // Run a PUT request to update saved value of article from false to true
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from note textarea
        body: $("#comment-input").val()
      }
    })
      // With that done
      .then(function (data) {

        // Find a p tag with data-id value.
        // console.log("\n Current val of p tag with data-id of " + thisId + "is " + $('p[data-id=' + thisId + ']').val() + "\n");
        // debugger;
        $('p[data-id=' + thisId + ']').text(data.body);

        // Log the response
        console.log(`\n Saved comment: ${data.body} \n`);
        // Empty the notes textarea
        $("#comment-input").val('');
      })
      .catch(function (err) {
        console.log("Error in saving comment in app.js not working: " + err);
      });
  }); // End of save-comment in modal



  // Click event handler for save article button
  $("body").on("click", "#save-article", function (event) {
    event.preventDefault();

    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log("article saved with this id: " + thisId);
    // Run a PUT request to update saved value of article from false to true
    $.ajax({
      method: "PUT",
      url: "/savedarticles/" + thisId,
    })
      // With that done
      .then(function (data) {
        // Log the response
        //console.log("suzy lives here");
        location.reload();
      })
      .catch(function (err) {
        console.log("Error in article app.js not working: " + err);
      });
  }); // End of save article button handler



  // Click event handler for remove save button or unsave the article
  $("body").on("click", "#unsave-article", function (event) {
    event.preventDefault();

    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log("article saved with this id: " + thisId);
    // Run a PUT request to update saved value of article from false to true
    $.ajax({
      method: "PUT",
      url: "/unsavedarticles/" + thisId,
    })
      // With that done
      .then(function (data) {
        // Log the response
        location.reload();
      })
      .catch(function (err) {
        console.log("Error in unsaving article app.js not working: " + err);
      });
  }); // End of remove/unsave event handler



  // Click event handler for the delete article button
  $("body").on("click", "#delete-article", function (event) {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log("article saved with this id: " + thisId);
    // Run a DELETE request to remove article from database
    $.ajax({
      method: "DELETE",
      url: "/deletearticles/" + thisId,
    })
      // With that done
      .then(function (data) {
        console.log("the article with this id: " + thisId + " was deleted from the database");
        location.reload();
      })
      .catch(function (err) {
        console.log("Error in article app.js not working: " + err);
      });
  }); // End of delete article handler



  // When you click the close class buttons from modal
  $("body").on("click", ".closer", function (event) {
    event.preventDefault();
    // Empty the notes textarea
    $("#comment-input").val('');
  });



  // Click event handler for view saved articles
  $('#saved').on("click", function (event) {
    location.href = ('/saved');
  });


})