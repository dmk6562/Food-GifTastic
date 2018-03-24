$(document).ready(function() {

//Array with food items as elements
var foodType = ['Shawarma', 'Baklava', 'Falafel', 'Churros', 'Pasta', 'Hummus'];


//Function for displaying initial food array elements as buttons
function renderButtons() {
    
// function to prevent repeat buttons
    $("#buttonFoods").empty();

// Looping through the array of foods
    for (var i = 0; i < foodType.length; i++) {

//Creating buttons for each food item in the array
  var a = $("<button>");

  a.addClass("btn btn - food info");
  // Adding a data-attribute 
  a.attr("data-name", foodType[i]);
  // Providing the button's text with a value of the food at index i
     a.text(foodType[i]);
  // Adding the button to the HTML
      $("#buttonFoods").append(a);
      $('#food-input').val('')
    }
  }

 // Event listener for our food-buttons
$("#add-food").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
   
    event.preventDefault();
    // This line will grab the text from the input box
    var food = $("#food-input").val().trim();
    // The food from the textbox is then added to our array
    foodType.push(food);
    // calling renderButtons which handles the processing of our food array
    renderButtons();
  });
  
  $(document).on("click",".food", showGifs);
  // Calling the renderButtons function at least once to display the initial list of foods
  renderButtons()
  
  });


//Grabbing and storing the data-food property value from the button
function showGifs() {
    var food = $(this).attr('data-name'); 
    
//Constructing a queryURL using the food item
  var apiKey = "jZbdTIiyS0EbKXCj7nzSh0G2JoW1pTFm";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=" + apiKey + "&limit=11";
  console.log(queryURL); 

//function to prevent repeat buttons
    $("#gifRowOne").empty();
    $("#gifRowTwo").empty();
    $("#gifRowThree").empty();
    $("#gifRowFour").empty();
    $("#gifRowFive").empty();
   
  //Perfoming an AJAX GET request to our queryURL      
    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
  //storing the array as variable name 
     var giphyArr = response.data; 
  //Looping through the array in queryURL
    for(var i=0; i<giphyArr.length; i++){
     
    var foodGifs = $('<div class="col-sm-3">')
    
    //Thisdisplays the rating of each gif
    var pOne = $("<p>").text("Rating: " + giphyArr[i].rating);
    var foodImage = $('<img data-state="still">')
    
    foodImage.attr('src', giphyArr[i].images.fixed_height_still.url)
    foodImage.attr('data-animate', giphyArr[i].images.fixed_height.url)
    foodImage.attr('data-still', giphyArr[i].images.fixed_height_still.url)
    foodImage.attr('class', 'gif img-responsive')
            
    foodGifs.append(pOne);
    foodGifs.append(foodImage);

    //Fit the gifs that iterate out onto page into their own rows of 2 with 5 total rows
    if (i < 2){
        $('#gifRowOne').append(foodGifs)
      }
      else if (i > 2 && i < 5) {
        $('#gifRowTwo').append(foodGifs);
      }
      else if (i > 4 && i < 7){
        $('#gifRowThree').append(foodGifs);
      }
      else if (i > 6 && i < 9) {
        $('#gifRowFour').append(foodGifs);
      }
      else if (i > 8 && i < 11) {
        $('#gifRowFive').append(foodGifs);
      };
    }
  })
}


//Add toggle function here
$(document).on("click", ".gif", function(){

    var still = $(this).attr("data-still");
    var animate = $(this).attr("data-animate");
  
    if ($(this).attr("data-state") === "still"){
      $(this).attr("src", animate);
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", still);
      $(this).attr("data-state", "still");
    }
  })