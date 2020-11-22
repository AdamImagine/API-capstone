'use strict';
// put your own value below!

function headerLink() {
    $('#home-link').click(function(){
        javascript:window.location.reload();
    });
}

function welcome() {
    $("#welcomeButton").click(function(){
        $("#welcome").addClass('hidden');
        $("#home").removeClass('hidden');
      });
}

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
    .then(response =>renderRecipe(response.meals))
    .catch(err =>alert(err));   
    $('#recipeResultsWindow').removeClass('hidden'); 
    });
    $("#resetRecipeSearch").click(function(){
        $("#recipeResults").html("");
        $("#resetRecipeSearch").addClass('hidden');
    })
   
}

function renderRecipe(stuff)
{
  $("#recipeResults").append("<h2>Meal:</h2>");
  $("#recipeResults").append(stuff[0]["strMeal"]);
  $("#recipeResults").append(`<br><img src='${stuff[0]["strMealThumb"]}'>`);
  $("#recipeResults").append("<h2>Recipe:</h2>");
  $("#recipeResults").append(`<p align="justify">${stuff[0]["strInstructions"]}</p>`);
}

    
function getReviews() {
    $("#nytButton").click(function() {
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
            renderReviewResults(data.results);
          })
          .catch(err => {
            console.error(err);
          });

      })
      
}

function renderReviewResults(movies) {
  movies.forEach((m)=> {
     $("#nytResults").append(`<h2>${m["display_title"]}</h2>`);
    $("#nytResults").append(m["title"]);
    $("#nytResults").append(`<br><img src="${m["multimedia"]["src"]}">`);
    $("#nytResults").append("<h2>Summary:</h2>");
    $("#nytResults").append(`<p align="justify">${m["summary_short"]}</p>`);
    $("#recipeResultsWindow").removeClass('hidden');
    $("#resetRecipeSearch").addClass('hidden');
  })
}

function init(){
    headerLink();
    welcome();
    home();
    getRecipeResults();
    getReviews();
}

$(init);