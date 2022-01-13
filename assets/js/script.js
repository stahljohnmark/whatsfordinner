var mealInput = document.getElementById("meal-input");
var drinkInput = document.getElementById("drink-input");
var recipesContainer = document.querySelector(".recipe-container");
var recipesColumn = document.getElementById("recipe-column");
var modalBackground = document.querySelector(".modal-background");
var modal = document.querySelector(".modal");

var displayClickedRecipe = function (event) {
    console.log("This is being called");
    var index = $(event.target).attr("data-index");
    console.log(index);
    modal.classList.add("is-active");
}

var stopDisplayingRecipe = function (event) {
    console.log("Stop displaying recipe is being called");
    modal.classList.remove("is-active");
}

// create card for displaying food
var createFoodCard = function (data) {
    // clear recipe div content
    recipesColumn.textContent = "";
    for (var i = 0; i < data.meals.length; i++) {
        var recipeTitle = data.meals[i].strMeal;
        var recipeImage = data.meals[i].strMealThumb;
        $(recipesColumn).append(`<div class="column is-4-tablet is-3-desktop">
        <div class="card">
            <div class="card-image has-text-centered px-6">
                <img src="${recipeImage}" alt="${recipeTitle}">
            </div>
            <div class="card-content">
                <p class="title is-size-5">${recipeTitle}</p>
            </div>
            <footer class="card-footer">
                <p class="card-footer-item">
                    <button class="button is-link is-light has-background-white recipe-button" data-index="${data.meals[i].idMeal}">View Recipe</button>
                </p>
            </footer>
        </div>
    </div>`);
    }
}

// display food recipe card with food title, image, and button to view recipe
var displayFoodCards = function (data) {

    // if there are less than 4 recipes, we want to center the cards on the screen 
    if (data.meals.length < 4) {
        $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-centered");
    } else {
        $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-multiline is-centered");
    }

    createFoodCard(data);
}

// fetching meal api
function mealSearch(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            displayFoodCards(data);
        });
}

var createDrinkCard = function (data) {
    // clear recipe div content
    recipesColumn.textContent = "";
    for (var i = 0; i < data.drinks.length; i++) {
        var recipeTitle = data.drinks[i].strDrink;
        var recipeImage = data.drinks[i].strDrinkThumb;
        $(recipesColumn).append(`<div class="column is-4-tablet is-3-desktop">
        <div class="card">
            <div class="card-image has-text-centered px-6">
                <img src="${recipeImage}" alt="${recipeTitle}">
            </div>
            <div class="card-content">
                <p class="title is-size-5">${recipeTitle}</p>
            </div>
            <footer class="card-footer">
                <p class="card-footer-item">
                    <a href="">View Recipe</a>
                </p>
            </footer>
        </div>
    </div>`);
    }
}

var displayDrinkCards = function (data) {

    // if there are less than 4 recipes, we want to center the cards on the screen 
    if (data.drinks.length < 4) {
        $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-centered");
    } else {
        $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-multiline is-centered");
    }

    createDrinkCard(data);
}

// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=whisky
// fetching drink api
function drinkSearch(query) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            displayDrinkCards(data);
        });

}

// EventListener for meal input
document.getElementById("meal-form").addEventListener("submit", function(event) {
    event.preventDefault();
    mealSearch(mealInput.value);
});

// EventListener for drink input
document.getElementById("drink-form").addEventListener("submit", function(event) {
    event.preventDefault();
    drinkSearch(drinkInput.value);
});

// when view recipe button is clicked it will call the displayClickedRecipe function to display the modal
$(document).on("click", ".recipe-button", displayClickedRecipe);

// when background is clicked stop displaying modal
$(document).on("click", ".modal-background", stopDisplayingRecipe);