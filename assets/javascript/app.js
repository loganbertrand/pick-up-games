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

  $('#create-game').on('click', function(){

    document.getElementById('form-spot').style.display = 'block';
  
    console.log('test')
  
  });

  //-------------GOOGLE MAPS VARIABLES-------------
  //Declare variables
  var lat;
  var lng; 
  var resp;
  var zCode;
  var map;
  var service;
  //var infowindow;
  var parkName;
  var parkAddress;
  var searchRadius = '';
  var selectedSport = '';

  //On click funtion to get parks in area
  $('#submit').on('click', function(){
       
    event.preventDefault()

    //document.getElementById('search-table').style.display = 'block';
    //assign var to inputs from HTML
    zCode = $('#create-zip-input').val().trim()
    searchRadius = $('#radius-input').val().trim()
    selectedSport = $('#create-sport-input').val().trim()
    console.log(zCode)
    console.log(searchRadius)
    console.log(selectedSport)
    //Define object properties in Firebase and push values to each
    //dataRef.ref().push({
    //    zipCode: zCode,
    //})
    //$('#train-name').val().empty()
    getCoords()
   
   })

  //  //On click funtion to get parks in area
  // $('#zip-code-search2').on('click', function(){
       
  //   event.preventDefault()

  //   //document.getElementById('search-table').style.display = 'block';
  //   //assign var to inputs from HTML
  //   zCode = $('#create-zip-input').val().trim()
  //   searchRadius = $('#radius-input').val().trim()
  //   selectedSport = $('#create-sport-input').val().trim()
  //   console.log(zCode)
  //   console.log(searchRadius)
  //   console.log(selectedSport)
    
  //  })

//Search button for Zip Code and Weather
$('#zip-code-search').on('click', function(){
 //-------------------GOOGLE MAPS-------------------
    
  event.preventDefault()

  document.getElementById('search-table').style.display = 'block';
  //assign var to inputs from HTML
  zCode = $('#create-zip-input').val().trim()
  searchRadius = $('#radius-input').val().trim()
  selectedSport = $('#create-sport-input').val().trim()
  console.log(zCode)
  console.log(searchRadius)
  console.log(selectedSport)
  //Define object properties in Firebase and push values to each
  //dataRef.ref().push({
  //    zipCode: zCode,
  //})
  //$('#train-name').val().empty()
  getCoords()



//-------------------WEATHER API STUFF ON CLICK ---------------------------------

})

//Submit button for posting the created game
$('#create-game-submit').on('click', function(){
  var name = $('#create-name-input').val().trim();
  var sport = $('#create-sport-input').val().trim();
  var zipCode = $('#create-zip-input').val().trim();
  var time = $('#create-time-input').val().trim();

  console.log(name);
  console.log(sport);
  console.log(zipCode);
  console.log(time);


  database.ref().push({
    name: name,
    sport: sport,
    zipCode: zipCode,
    time: time,
  });
});

//--------Homepage cards--------------------------------------
var nameArray = []
var sportArray = []
console.log(nameArray)
console.log(sportArray)
console.log(nameArray)
//Set the database values to the webpage
database.ref().on("child_added", function(childSnapshot) {
  
      var name = childSnapshot.val().name;
      var sport = childSnapshot.val().sport;
      var zipCode = childSnapshot.val().zipCode;
      var time = childSnapshot.val().time;
      nameArray.push(name)
      sportArray.push(sport)

      var cardDiv = document.createElement('div');
      cardDiv.className = 'col-12 col-md-4';

      var card = document.createElement('div');
      card.className = 'card mb-2'; //shadow cursor-pointer
      //card.style = 'width: 18rem;'

      var image =document.createElement('img')
      image.className = 'card-img-top';
      image.src = 'https://mdbootstrap.com/img/Photos/Others/img%20(36).jpg'

      var cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      var title = document.createElement('h5');
      title.innerText = name;
      title.className = 'card-title';

      var subtitle = document.createElement('h6');
      subtitle.innerText = sport;
      subtitle.className = 'card-subtitle mb-2 text-muted';

      var cardtext = document.createElement('p');
      cardtext.innerText = zipCode;
      cardtext.className = 'card-text';
})

//Set the database values to the webpage
database.ref().on("child_added", function(childSnapshot) {

  //define table row variable
  var tableRow = $('<tr>')

  //Adding clickable-row class
  tableRow.addClass('clickable-row')
  tableRow.attr('data-toggle', "modal")
  tableRow.attr('data-target', "#exampleModalCenter2")
  
  //append that to the main table
  $('#current-table').append(tableRow)

  //define variables
  var name = childSnapshot.val().name;
  var sport = childSnapshot.val().sport;
  var zipCode = childSnapshot.val().zipCode;
  var time = childSnapshot.val().time;


  
  $(tableRow).append("<td>" + sport + "</td>")
  $(tableRow).append('<td>' + zipCode + '</td>')
  $(tableRow).append("<td>" + name + "</td>")
  $(tableRow).append('<td>' + time + '</td>') 

  document.getElementById('form-spot').style.display = 'none';
  clearCreateForm()
});

//Result page event listner, updates seach results
//$('#zip-code-search2').on("click", function() {
  // event.preventDefault();
  //console.log('hello')
  //zCode = $('#create-zipcode-input2').val()
  //searchRadius = $('#radius-input2').val()
  //selectedSport = $('#create-sport-input2').val().trim()
  //console.log(zCode)
  //console.log(searchRadius)
  //console.log(selectedSport)
  //resultDataDisplay()
//})
//Result page event listner, updates seach results
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
})
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
      var zipCode = data.val().zipCode;
      var time = data.val().time;

      console.log(time)
      console.log(sport)
      console.log(zipCode)
      console.log(time)

      $(tableRow).append("<td>" + sport + "</td>")
      $(tableRow).append('<td>' + zipCode + '</td>')
      $(tableRow).append("<td>" + name + "</td>")
      $(tableRow).append('<td>' + time + '</td>') 
    
      document.getElementById('form-spot').style.display = 'none';
      clearCreateForm()
    });
  })
}
//})

function clearCreateForm(){
   $('#create-name-input').val('')
   $('#create-sport-input').val('')
   $('#create-zip-input').val('')
   $('#create-time-input').val('')
}

//Event listener for click row in create game modal
$('.clickable-row').click(function() {
  //window.location = $(this).data("href");
  alert('hello')
});

database.ref().on("value", function(snapshot) {

//Variables for displaying on a new card needed

}, 
// Handle the errors
function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


//---------WEATHER API APP----------------------------------------
var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=92102,us&appid=ff38d4fe0116519dd3020cd98753034a";
    // Here we run our AJAX call to the OpenWeatherMap API
 function getWeather(){
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      
      var tempC = response.main.temp
      var tempF = (tempC-273) * 1.8 + 32
      
      
      console.log(response)
      
      console.log(response.name)
      console.log(response.wind.speed)
      console.log(response.wind.deg)
      console.log(tempF)
      console.log(tempC)
      
    });
 }

//STUPID GOOGLE MAPS IS STUPID----------------------------------------------------------------------------

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
            var tableRow  = $('<tr>').addClass('clickable-row')
            parkName = results[i].name
            parkAddress = results[i].vicinity
            console.log(parkName)    
            console.log(results.length)
            $('#table-data').append(tableRow)
            $(tableRow).append('<td>' + parkName + '</td>')
            $(tableRow).append('<td>' + parkAddress + '</td>')
        }
    }


