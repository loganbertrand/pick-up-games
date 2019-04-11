// SD Pick Up Games

// Initialize Firebase<script>
  // Initialize Fiase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7WKY0CFTVlAgQb9Gp72FdN9yDU2u4zKI",
    authDomain: "groupproject-972ed.firebaseapp.com",
    databaseURL: "https://groupproject-972ed.firebaseio.com",
    projectId: "groupproject-972ed",
    storageBucket: "groupproject-972ed.appspot.com",
    messagingSenderId: "142851479998"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var neighborhood = "";
  var location = "";
  var organizer = "";
  var time = "";

  $("add-user".on("click", function() {
  
    event.preventDefault();

  neighborhood = $("#neighborhood-input").val().trim();
      location = $("#location-input").val().trim();
      organizer = $("#organizer-input").val().trim();
      time = $("#time-input").val().trim();

      database.ref().set({
        neighborhood: neighborhood,
        location: location,
        organizer: organizer,
        time: time,
});

database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().neighborhood);
    console.log(snapshot.val().location);
    console.log(snapshot.val().organizer);
    console.log(snapshot.val().time);

    $("#neighborhood-display").text(snapshot.val().neighborhood);
      $("#location-display").text(snapshot.val().location);
      $("#organizer-display").text(snapshot.val().organizer);
      $("#time-display").text(snapshot.val().time);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    })


//==============================Weather API function=============

//Weather API Key : 4acb868eee5f62dc0b837676700ba625

    var APIKey = "4acb868eee5f62dc0b837676700ba625";

    var queryURL = "https://samples.openweathermap.org/data/2.5/weather?zip=92102,us&appid=b6907d289e10d714a6e88b30761fae22" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      })












//Create Pick Up Game button-logan

//On click, pop up modal

    //Within modal, form is available to fill out

    //Within form, enter zip has a 'search' button within to request

        //When Search button clicked, Google Maps API request and Weather based off      Zip shows results





//google maps api key: AIzaSyApXuhqWNe1cN6kA4ojTP9aqVVsDcteGbU



//Sign in to have user data and 

// Search for Pick up games that have been posted around you

    //Show the amount of people going, the location, type of game and a description that the poster has created

    //Click that you are interested in going

// Post a Pick Up Game for people to join

    //Enter the category for the type of sport

    //Short Description on what exactly you want to do, where in the park you might be

    //Choose the park that you are going to, from a list of parks nearby

    //google maps usage
  