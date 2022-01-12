"use strict";

var mealInput = document.getElementById("meal-input");
var drinkInput = document.getElementById("drink-input");
var recipesContainer = document.querySelector(".recipe-container");
var recipesColumn = document.getElementById("recipe-column"); // create card for displaying food

var createFoodCard = function createFoodCard(data) {
  // clear recipe div content
  recipesColumn.textContent = "";

  for (var i = 0; i < data.meals.length; i++) {
    var recipeTitle = data.meals[i].strMeal;
    var recipeImage = data.meals[i].strMealThumb;
    $(recipesColumn).append("<div class=\"column is-4-tablet is-3-desktop\">\n        <div class=\"card\">\n        \n            <div class=\"card-image has-text-centered px-6\">\n            <img src=\"".concat(recipeImage, "\" alt=\"").concat(recipeTitle, "\">\n            <a class=\"top-right is-size-1\"><i class=\"far fa-star star\"></i></a>\n            </div>\n            <div class=\"card-content\">\n                <p class=\"title is-size-5\">").concat(recipeTitle, "</p>\n            </div>\n            <footer class=\"card-footer\">\n                <p class=\"card-footer-item\">\n                    <a href=\"\">View Recipe</a>\n                </p>\n            </footer>\n        </div>\n    </div>"));
  }
}; // display food recipe card with food title, image, and button to view recipe


var displayFoodCards = function displayFoodCards(data) {
  // if there are less than 4 recipes, we want to center the cards on the screen 
  if (data.meals.length < 4) {
    $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-centered");
  } else {
    $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-multiline is-centered");
  }

  createFoodCard(data);
}; // fetching meal api


function mealSearch(query) {
  var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=".concat(query);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    displayFoodCards(data);
  });
}

var createDrinkCard = function createDrinkCard(data) {
  // clear recipe div content
  recipesColumn.textContent = "";

  for (var i = 0; i < data.drinks.length; i++) {
    var recipeTitle = data.drinks[i].strDrink;
    var recipeImage = data.drinks[i].strDrinkThumb;
    $(recipesColumn).append("<div class=\"column is-4-tablet is-3-desktop\">\n        <div class=\"card\">\n            <div class=\"card-image has-text-centered px-6\">\n                <img src=\"".concat(recipeImage, "\" alt=\"").concat(recipeTitle, "\">\n            </div>\n            <div class=\"card-content\">\n                <p class=\"title is-size-5\">").concat(recipeTitle, "</p>\n            </div>\n            <footer class=\"card-footer\">\n                <p class=\"card-footer-item\">\n                    <a href=\"\">View Recipe</a>\n                </p>\n            </footer>\n        </div>\n    </div>"));
  }
};

var displayDrinkCards = function displayDrinkCards(data) {
  // if there are less than 4 recipes, we want to center the cards on the screen 
  if (data.drinks.length < 4) {
    $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-centered");
  } else {
    $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-multiline is-centered");
  }

  createDrinkCard(data);
}; // https://www.thecocktaildb.com/api/json/v1/1/search.php?s=whisky
// fetching drink api


function drinkSearch(query) {
  var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=".concat(query);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    displayDrinkCards(data);
  });
} // EventListener for meal input


document.getElementById("meal-form").addEventListener("submit", function (event) {
  event.preventDefault();
  mealSearch(mealInput.value);
}); // EventListener for drink input

document.getElementById("drink-form").addEventListener("submit", function (event) {
  event.preventDefault();
  drinkSearch(drinkInput.value);
});