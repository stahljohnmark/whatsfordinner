var mealInput = document.getElementById("meal-input");
var drinkInput = document.getElementById("drink-input");
var recipesContainer = document.querySelector(".recipe-container");
var recipesColumn = document.getElementById("recipe-column");
var modalBackground = document.querySelector(".modal-background");
var modal = document.querySelector(".modal");

var createIngredientsList = function (data) {
    var ingredients = [
        {
            ingredient: data.meals[0].strIngredient1,
            amount: data.meals[0].strMeasure1
        },
        {
            ingredient: data.meals[0].strIngredient2,
            amount: data.meals[0].strMeasure2
        },
        {
            ingredient: data.meals[0].strIngredient3,
            amount: data.meals[0].strMeasure3
        },
        {
            ingredient: data.meals[0].strIngredient4,
            amount: data.meals[0].strMeasure4
        },
        {
            ingredient: data.meals[0].strIngredient5,
            amount: data.meals[0].strMeasure5
        },
        {
            ingredient: data.meals[0].strIngredient6,
            amount: data.meals[0].strMeasure6
        },
        {
            ingredient: data.meals[0].strIngredient7,
            amount: data.meals[0].strMeasure7
        },
        {
            ingredient: data.meals[0].strIngredient8,
            amount: data.meals[0].strMeasure8
        },
        {
            ingredient: data.meals[0].strIngredient9,
            amount: data.meals[0].strMeasure9
        },
        {
            ingredient: data.meals[0].strIngredient10,
            amount: data.meals[0].strMeasure10
        },
        {
            ingredient: data.meals[0].strIngredient11,
            amount: data.meals[0].strMeasure11
        },
        {
            ingredient: data.meals[0].strIngredient12,
            amount: data.meals[0].strMeasure12
        },
        {
            ingredient: data.meals[0].strIngredient13,
            amount: data.meals[0].strMeasure13
        },
        {
            ingredient: data.meals[0].strIngredient14,
            amount: data.meals[0].strMeasure14
        },
        {
            ingredient: data.meals[0].strIngredient15,
            amount: data.meals[0].strMeasure15
        },
        {
            ingredient: data.meals[0].strIngredient16,
            amount: data.meals[0].strMeasure16
        },
        {
            ingredient: data.meals[0].strIngredient17,
            amount: data.meals[0].strMeasure17
        },
        {
            ingredient: data.meals[0].strIngredient18,
            amount: data.meals[0].strMeasure18
        },
        {
            ingredient: data.meals[0].strIngredient19,
            amount: data.meals[0].strMeasure19
        },
        {
            ingredient: data.meals[0].strIngredient20,
            amount: data.meals[0].strMeasure20
        },
    ];

    for (var i = 0; i < ingredients.length; i++) {
        if (ingredients[i].ingredient && ingredients[i].amount) {
            $(".ingredient-list").append(`<li>${ingredients[i].amount} ${ingredients[i].ingredient}</li>`);
        }
       
    }
}

// Creates the modal to display the recipe information
var createRecipeModal = function (data) {

    var recipeTitle = data.meals[0].strMeal;
    var instructions = data.meals[0].strInstructions;
    var recipeImg = data.meals[0].strMealThumb;
    $(".recipe-title").text(recipeTitle);
    $(".instructions").text(instructions);
    $(".recipe-img").attr( { src: recipeImg, alt: recipeTitle} );
    createIngredientsList(data);
    modal.classList.add("is-active");
}

// Makes a call the the api using the id of the recipe that was clicked to show that recipes info
var displayClickedRecipe = function (event) {
    event.preventDefault();
    console.log("This is being called");
    var index = $(event.target).attr("data-index");
    console.log(index);

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data.meals[0]);
                createRecipeModal(data);
            });
        } else {
            console.log("Recipe not found!");
        }
    })
    .catch(function (error) {
        console.log("Unable to connect to The Meal Db");
    });

};

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

// when x is clicked stop displaying modal
$(document).on("click", ".delete", stopDisplayingRecipe);