'use strict';
//js
//home link function
function headerLink() {
    $('#home-link').click(function(){
        javascript:window.location.reload();
    });
}
//button to advance into program
function welcome() {
    $("#welcomeButton").click(function(){
        $("#welcome").addClass('hidden');
        $("#home").removeClass('hidden');
      });
}
//route selection reveal selected search
function home() {
    $("#the-meal-db").click(function(){
        $("#home").addClass('hidden');
        $("#recipe-search").removeClass('hidden');
    });
    $("#nyt-reviews").click(function(){
        $("#nyt-search").removeClass('hidden');
        $("#home").addClass('hidden');
    });

}
//fetch data from API
function getRecipeResults(){
    console.log("getRecipeResults ran");
    $("#randomRecipe").click(function(){
        $("#recipeResults").html("");
        $("#resetRecipeSearch").removeClass('hidden');
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response =>{
        if (response.ok){
            return response.json();
        }        
    })
    //run program to target specific values
    .then(response =>renderRecipe(response.meals))
    .catch(err =>alert(err)); 
    //display values  
    $('#recipeResultsWindow').removeClass('hidden'); 
    });
    //reset search parameters and clear results
    $("#resetRecipeSearch").click(function(){
        $("#recipeResults").html("");
        $("#resetRecipeSearch").addClass('hidden');
    })
   
}
//targets specific values
function renderRecipe(stuff)
{
  $("#recipeResults").append("<h2>Meal:</h2>");
  $("#recipeResults").append(stuff[0]["strMeal"]);
  $("#recipeResults").append(`<br><img src='${stuff[0]["strMealThumb"]}'>`);
  $("#recipeResults").append("<h2>Recipe:</h2>");
  $("#recipeResults").append(`<p align="justify">${stuff[0]["strInstructions"]}</p>`);
}

//fetch specific data from API
function getReviews() {
    $("#nytButton").click(function() {
      $("#nytResults").html("");
        const url = "https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=6BF9RHpCqGP53M7zc4eJAkeiGAlA1P7m";
        const options = {
          method: "GET",
          headers: {
            "Accept": "application/json"
          },
        };
        fetch(url, options).then(
          response => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then(err => {
              return Promise.reject({
                status: response.status,
                statusText: response.statusText,
                errorMessage: err,
              });
            });
          })
          .then(data => {
            console.log(data);
//target specific data from API response
            renderReviewResults(data.results);
          })
          .catch(err => {
            console.error(err);
          });

      })
      
}

//iterate through data targeting sought after values
function renderReviewResults(movies) {
  movies.forEach((m)=> {
     $("#nytResults").append(`<h2>${m["display_title"]}</h2>`);
    $("#nytResults").append(m["title"]);
    $("#nytResults").append(`<br><img src="${m["multimedia"]["src"]}">`);
    $("#nytResults").append("<h2>Summary:</h2>");
    $("#nytResults").append(`<p align="justify">${m["summary_short"]}</p>`);
//reaveal specific data in results window
    $("#recipeResultsWindow").removeClass('hidden');
//hide recipe reset search button
    $("#resetRecipeSearch").addClass('hidden');
  })
}
//document ready function
function init(){
    headerLink();
    welcome();
    home();
    getRecipeResults();
    getReviews();
}

$(init);