// SD Pick Up Games

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBE2dCicaIDw_mbKaD1DgdQn9YFvWMZfxA",
    authDomain: "sd-pickup-games.firebaseapp.com",
    databaseURL: "https://sd-pickup-games.firebaseio.com",
    projectId: "sd-pickup-games",
    storageBucket: "sd-pickup-games.appspot.com",
    messagingSenderId: "847319270081"
  };
  firebase.initializeApp(config);

  //Declaring Firebase database API
  var database = firebase.database();

  //Create Pick Up Game button-logan


  //-------------GOOGLE MAPS VARIABLES-------------
  //Declare variables
  var lat
  var lng 
  var resp
  var zCode
  var map;
  var service;
  //var infowindow;
  var parkName;
  var parkAddress;
  var searchRadius = '';
  var selectedSport = '';

//Search button for Zip Code and Weather
$('#zip-code-search').on('click', function(){
 //-------------------GOOGLE MAPS-------------------
    
  event.preventDefault()
  $('#create-search-results').html('');
  $('#table-data').html('')

  
  //assign var to inputs from HTML
  zCode = $('#create-zip-input').val().trim()
  searchRadius = $('#radius-input').val().trim()
  selectedSport = $('#create-sport-input').val().trim()
  console.log(zCode)
  console.log(searchRadius)
  console.log(selectedSport)

  //----ZIP CODE INPUT VALIDATION----
  if(zCode.length !== 5 || zCode.length == 0){
    document.getElementById('zip-invalid').style.display = 'block';
  }else{
    document.getElementById('zip-invalid').style.display = 'none';
    document.getElementById('search-table').style.display = 'block';
    //---------GOOGLE API ON CLICK----
    getCoords()
  //----------WEATHER API STUFF ON CLICK ---------
    getWeather();
  }
});
//Data for location results
  $('#table-data').on( 'click', 'tr', function (cel) {
    $(this).addClass('highlight')

    var resultName = cel.target.childNodes[0].data;
    var resultAddress = cel.target.childNodes[2].data;

    console.log(resultName + ': ' + resultAddress)

    var resultLocation = resultName + ': ' + resultAddress

    var hiddenData = $('<div class="hidden-data">' + resultLocation  + '</div>')

    $('.hidden-div').append(hiddenData)

    document.getElementById('search-table').style.display = 'none';

  });

   //Submit button for posting the created game
$('#create-game-submit').on('click', function(){
  event.preventDefault()
  
  var name = $('#create-name-input').val().trim();
  var sport = $('#create-sport-input').val().trim();
  var location = $('.hidden-data').text();
  var time = $('#create-time-input').val().trim();
  var zipCode = $('#create-zip-input').val().trim();

  console.log(name);
  console.log(sport);
  console.log(time);


  database.ref().push({
    name: name,
    sport: sport,
    location: location,
    time: time,
    zipCode: zipCode
  });

  });


  
//Set the database values to the webpage
database.ref().on("child_added", function(childSnapshot) {

  //define table row variable
  var tableRow = $('<tr>')

  //append that to the main table
  $('#current-table').append(tableRow)

  //define variables
  var name = childSnapshot.val().name;
  var sport = childSnapshot.val().sport;
  var location = childSnapshot.val().location;
  var time = childSnapshot.val().time;
  var formatTime = moment(time, 'HH:mm').format('hh:mm a')

  
  $(tableRow).append("<td>" + sport + "</td>")
  $(tableRow).append('<td>' + location + '</td>')
  $(tableRow).append("<td>" + name + "</td>")
  $(tableRow).append('<td>' + formatTime + '</td>')

  
  clearCreateForm()
}, 
// Handle the errors
function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

function clearCreateForm(){
   $('#create-name-input').val('')
   $('#create-sport-input').val('')
   $('#create-zip-input').val('')
   $('#create-time-input').val('')
}

//RESULT PAGE event listner, updates seach results
$('#submit-btn').on("click", function() {
  event.preventDefault();
  console.log('hello')
  zCode = $('#zipcode-input').val()
  searchRadius = $('#radius-input').val()
  selectedSport = $('#sport-input').val().trim()
  console.log(zCode)
  console.log(searchRadius)
  console.log(selectedSport)
  resultDataDisplay()
});
function resultDataDisplay(){
  database.ref().orderByChild("sport").equalTo(selectedSport).on('value', function(snapshot) {
    snapshot.forEach(function(data) {
      console.log('hello2')
      console.log(snapshot.val())
      //define table row variable
      var tableRow = $('<tr>')

      //Adding clickable-row class
      tableRow.addClass('clickable-row')

      //append that to the main table
      $('#refined-table').append(tableRow)
      
      var name = data.val().name;
      var sport = data.val().sport;
      var location = data.val().location;
      var time = data.val().time;
      var formatTime = moment(time, 'HH:mm').format('hh:mm a')

      console.log(time)
      console.log(sport)
      console.log(location)
      console.log(time)

      $(tableRow).append("<td>" + sport + "</td>")
      $(tableRow).append('<td>' + location + '</td>')
      $(tableRow).append("<td>" + name + "</td>")
      $(tableRow).append('<td>' + formatTime + '</td>') 
    
      document.getElementById('form-spot').style.display = 'none';
      clearCreateForm()
    })
  })
};


//---------WEATHER API APP QUERY----------------------------------------

    // Here we run our AJAX call to the OpenWeatherMap API
 function getWeather(){

  var zipCode = $('#create-zip-input').val().trim();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=ff38d4fe0116519dd3020cd98753034a";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      var city = response.name;
      var weatherIcon = response.weather[0].icon;
      var tempK = response.main.temp
      var tempF = Math.floor((tempK-273) * 1.8 + 32) 
      
      
      console.log(response)
      console.log(weatherIcon)
      console.log(city)
      console.log(tempF)
      
      // ------- POSTING WEATHER CARD ------

        //http://openweathermap.org/img/w/[weatherIcon].png ----Link to image icon for weather

      var newCard = $('<div class="card" style="width: 18rem;">')
      var newCardBody = $('<div class="card-body">')  
      var newCardTitle = $('<h5 class="card-title">'+  city + '</h5>')  
      var newDeg =$('<h2 class="card-subtitle mb-2 text-muted">' + tempF + '</h2>') 
      var newImg = $('<img src = "http://openweathermap.org/img/w/' + weatherIcon + '.png">')  

      $('#create-search-results').append(newCard)
      $(newCard).append(newCardBody)
      $(newCardBody).append(newCardTitle)
      $(newCardBody).append(newDeg)
      $(newCardBody).append(newImg)

      
    });
 }

//------------------STUPID GOOGLE MAPS IS STUPID----------------------------------------------------------------------------

//Link for Google Places API
    
    //Takes the zipcode input and converts to latitue and longitiue coordinates.
    function getCoords() {
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ zCode +"&key=AIzaSyApXuhqWNe1cN6kA4ojTP9aqVVsDcteGbU"
        var result
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET",
            async: false,
            success: function(response){
            resp = response;
            result = resp.results   
            }
        })  
        lat = result[0].geometry.location.lat
        lng = result[0].geometry.location.lng
        console.log(lat)
        console.log(lng)  
        //Calls initialize function
        initialize()
    }
    //Function to create and submit request to Google Places API.
    function initialize() {
        var meterConv = ''
        meterConv= searchRadius * 1609.344
        var area = new google.maps.LatLng(lat,lng);
        map = new google.maps.Map(document.getElementById('map'), {
            center: area,
            zoom: 15
            });
        var request = {
            location: area,
            radius: meterConv,
            type: ['park'],
            keyword: selectedSport
        };
        console.log(request)
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }
    //Function is a callback request from Google Places JSON, and data is appended to HTML
    function callback(results, status) {
        console.log(results)
        for (var i = 0; i < results.length; i++) {
            var tableRow  = $('<tr>')
            parkName = results[i].name
            parkAddress = results[i].vicinity
            console.log(parkName)    
            console.log(results.length)
            $('#table-data').append(tableRow)
            $(tableRow).append('<td class="park-name">' + parkName + '<br>' + parkAddress + '</td>')
        }
    }





