var mealInput = document.getElementById("meal-input");
var drinkInput = document.getElementById("drink-input");
var recipesContainer = document.querySelector(".recipe-container");
var recipesColumn = document.getElementById("recipe-column");

// create card for displaying food
var createFoodCard = function(data) {
    // clear recipe div content
    recipesColumn.textContent = "";
    for (var i = 0; i < data.meals.length; i++) {
        var recipeTitle = data.meals[i].strMeal;
        var recipeImage = data.meals[i].strMealThumb;
        $(recipesColumn).append(`<div class="column is-4-tablet is-3-desktop">
        <div class="card">
        
            <div class="card-image has-text-centered px-6">
            <img src="${recipeImage}" alt="${recipeTitle}">
            <div class="top-right is-size-1"><i class="far fa-star meal-star" id="meal-star"></i></div>
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

// display food recipe card with food title, image, and button to view recipe
var displayFoodCards = function(data) {

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

var createDrinkCard = function(data) {
    // clear recipe div content
    recipesColumn.textContent = "";
    for (var i = 0; i < data.drinks.length; i++) {
        var recipeTitle = data.drinks[i].strDrink;
        var recipeImage = data.drinks[i].strDrinkThumb;
        $(recipesColumn).append(`<div class="column is-4-tablet is-3-desktop">
        <div class="card">
            <div class="card-image has-text-centered px-6">
                <img src="${recipeImage}" alt="${recipeTitle}">
                <<div class="top-right is-size-1"><i class="far fa-star drink-star" id="drink-star"></i></div>
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

var displayDrinkCards = function(data) {

    // if there are less than 4 recipes, we want to center the cards on the screen 
    if (data.drinks.length < 4) {
        $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-centered");
    } else {
        $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-multiline is-centered");
    }

    createDrinkCard(data);
}

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
    mealStar()

});

// EventListener for drink input
document.getElementById("drink-form").addEventListener("submit", function(event) {
    event.preventDefault();
    drinkSearch(drinkInput.value);
    drinkStar();
});
// drink save start
function drinkStar() {
    var drinkStarInvterval = setInterval(function() {

        if ($("#drink-star").length) {

            $(".drink-star").on("click", function() {

                $(this).removeClass("far fa-star").addClass("fas fa-star save");
            });
            $(".drink-star").on("dblclick", function() {
                $(this).removeClass("fas fa-star save").addClass("far fa-star");
            });
            clearInterval(drinkStarInvterval);
        }
    }, 1000);

}

// meal save start
function mealStar() {
    var mealStarInvterval = setInterval(function() {

        if ($("#meal-star").length) {

            $(".meal-star").on("click", function() {

                $(this).removeClass("far fa-star").addClass("fas fa-star save");
            });
            $(".meal-star").on("dblclick", function() {
                $(this).removeClass("fas fa-star save").addClass("far fa-star");
            });
            clearInterval(mealStarInvterval);
        }
    }, 1000);

}