// PSEUDOCODE!!

// 1. Have a list of animals on the top of the page (an array??)
    // MOVIE activity

  var animalsArray = ["cat", "dog", "hamster", "bird", 
  "rabbit", "goldfish", "turtle", "hedgehog", "lizard", 
  "chameleon", "chicken", "goat", "mouse"];



  // 2. When an animal button is clicked, it needs to:
    
    
    // 2c. Show the rating of each gif
      // MOVIE STAR Activity
  // 3. Each animated gif must start paused, can be clicked to animate, and click again to pause them
    // PAUSING GIFS Activity
  // 4. Have an input box where the user can add an animal
  // 5. When the animal is added...
    // 5a. The user's input appears as a button along the top of the page
    // 5b. The user's input button is styled correctly (uses the .animalbutton class)


      // Function for displaying data
      function renderButtons() {


        
        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise we will have repeat buttons)
        $("#animalButtonsList").empty();

        // Looping through the array of animal
        for (var i = 0; i < animalsArray.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("animalbutton");
          // Added a data-attribute
          a.attr("data-name", animalsArray[i]);
            // Each of these buttons has an ID of animal-button
          a.attr("id", "animal-button")
            // Provided the initial button text
          a.text(animalsArray[i]);
          // Added the button to the HTML
          $("#animalButtonsList").append(a);


          console.log("This is the end of the RenderButtons function.");
        }
      }


      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animalInput = $("#animal-input").val().trim();

        // The animal from the textbox is then added to our array
        animalsArray.push(animalInput);

        // Calling renderButtons which handles the processing of our animals array
        renderButtons();
      });


  // Ask classmates and see if there's a way to return both multiple results, and all random.
  // The Search API doesn't return Random
  // The Random API doesn't return Multiples
  // How do I return BOTH Randoms AND Multiples?
  // Need a new API?
  // Go to grocery store 10 times?
  // Some other API solution?
  // Check w/teacher.

  // 6. When the user-created button is clicked, it must behave exactly the same way as a pre-existing button from Step 2.




  // Adding click event listeners to all elements with a class of "animalbutton"
  $(document).on("click", ".animalbutton", function() {
    // Debugging feedback
    console.log("Animal Button has been clicked.");

    // 2a. Remove all previous gifs (if any exist)
    $("#gifs-appear-here").empty();
    // Debugging feedback
    console.log("gifs view is cleared.")


    var animal = $(this).attr("data-name");

    // ===================
    // This is our working Giphy API URL!!
    // =======================
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    // ==========================================================

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);

      var results = response.data;
      // 2b. Generate 10 animated gifs
      for (var i = 0; i < results.length; i++) {


        var animalDiv = $("<div>");

        var p = $("<p>");
        p.text("Rating: " + results[i].rating);

        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height_still.url);

        // gif class is added to the button, for the pausing framework to hook into.
        animalImage.addClass("gif");
        console.log("gif class is added.");


        // Create an attribute called data-state, and store the Still value into it.
        // data-state="still"
        animalImage.attr("data-state", "still");


        // Create the data-still state, and store the Still URL into it
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);

        // Create the data-animate state, and store the Animated URL into it
        animalImage.attr("data-animate", results[i].images.fixed_height.url);


        // Creating a class for the animalDiv that contains each image+rating combo.
        animalDiv.addClass("picHolder");


        animalDiv.prepend(p, animalImage);

        $("#gifs-appear-here").prepend(animalDiv);
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