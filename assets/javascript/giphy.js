// PSEUDOCODE!!

// 1. Have a list of pictures on the top of the page (an array??)
    // MOVIE activity

  var picturesArray = ["cat", "dog", "lizard", "Zelda", 
  "Super Smash Bros", "Star Fox", "Metroid", "Star Wars", "Lightsaber", 
  "Disney", "Pixar", "Batman", "Harley Quinn"];



  // 2. When an picture button is clicked, it needs to:
    
    
    // 2c. Show the rating of each gif
      // MOVIE STAR Activity
  // 3. Each animated gif must start paused, can be clicked to animate, and click again to pause them
    // PAUSING GIFS Activity
  // 4. Have an input box where the user can add an picture
  // 5. When the picture is added...
    // 5a. The user's input appears as a button along the top of the page
    // 5b. The user's input button is styled correctly (uses the .picturebutton class)


      // Function for displaying data
      function renderButtons() {


        
        // Deleting the pictures prior to adding new pictures
        // (this is necessary otherwise we will have repeat buttons)
        $("#pictureButtonsList").empty();

        // Looping through the array of picture
        for (var i = 0; i < picturesArray.length; i++) {

          // Then dynamicaly generating buttons for each picture in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("picturebutton");
          // Added a data-attribute
          a.attr("data-name", picturesArray[i]);
            // Each of these buttons has an ID of picture-button
          a.attr("id", "picture-button")
            // Provided the initial button text
          a.text(picturesArray[i]);
          // Added the button to the HTML
          $("#pictureButtonsList").append(a);


          console.log("This is the end of the RenderButtons function.");
        }
      }


      // This function handles events where one button is clicked
      $("#add-picture").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var pictureInput = $("#picture-input").val().trim();

        // The picture from the textbox is then added to our array
        picturesArray.push(pictureInput);

        // Calling renderButtons which handles the processing of our pictures array
        renderButtons();
      });


  // 6. When the user-created button is clicked, it must behave exactly the same way as a pre-existing button from Step 2.




  // Adding click event listeners to all elements with a class of "picturebutton"
  $(document).on("click", ".picturebutton", function() {
    // Debugging feedback
    console.log("picture Button has been clicked.");

    // 2a. Remove all previous gifs (if any exist)
    $("#gifs-appear-here").empty();
    // Debugging feedback
    console.log("gifs view is cleared.")


    var picture = $(this).attr("data-name");

    // This is the secret sauce! The startPoint variable is a random whole number between 1 and 1000. With each 
    // page displaying 10 gifs, this gives us a "random" pool of 100 different pages to pull from.
    var startPoint = Math.floor(Math.random() * 1000);

    // ===================
    // This is our working Giphy API URL!!
    // =======================
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      picture + "&api_key=dc6zaTOxFJmzC&limit=10&offset=" + startPoint; 
    // ==========================================================

    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);

      var results = response.data;
      // 2b. Generate 10 animated gifs
      for (var i = 0; i < results.length; i++) {


        var pictureDiv = $("<div>");

        var p = $("<p>");
        p.text("Rating: " + results[i].rating);

        var pictureImage = $("<img>");
        pictureImage.attr("src", results[i].images.fixed_height_still.url);

        // gif class is added to the button, for the pausing framework to hook into.
        pictureImage.addClass("gif");
        console.log("gif class is added.");


        // Create an attribute called data-state, and store the Still value into it.
        pictureImage.attr("data-state", "still");


        // Create the data-still state, and store the Still URL into it
        pictureImage.attr("data-still", results[i].images.fixed_height_still.url);

        // Create the data-animate state, and store the Animated URL into it
        pictureImage.attr("data-animate", results[i].images.fixed_height.url);


        // Creating a class for the pictureDiv that contains each image+rating combo.
        pictureDiv.addClass("picHolder");


        pictureDiv.prepend(p, pictureImage);

        $("#gifs-appear-here").prepend(pictureDiv);
      }

      });
    }
  
    
    
    );
  // This renders our buttons on the first page load
  renderButtons();







  $(document).on("click", ".gif", function() {
    console.log("The gif is clicked!");
    
    
    //make a variable named state and then store the image's data-state into it
    var state = $(this).attr("data-state");
    console.log("The image's state is: " + state);

    // Check if the variable state is equal to 'still'
    if (state === "still") {
      // update the src attribute of this image to it's data-animate value
      $(this).attr("src", $(this).attr("data-animate"));
      // update the data-state attribute to 'animate'.
      $(this).attr("data-state", "animate");
      


      // If state is equal to 'animate'... 
    } else {
      // update the src attribute of this image to it's data-still value
      $(this).attr("src", $(this).attr("data-still"));
      // update the data-state attribute to 'still'
      $(this).attr("data-state", "still");

    }


  });