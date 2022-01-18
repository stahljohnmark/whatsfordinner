var mealInput = document.getElementById("meal-input");
var drinkInput = document.getElementById("drink-input");
var recipesContainer = document.querySelector(".recipe-container");
var recipesColumn = document.getElementById("recipe-column");
var favorite = {
    meal: [],
    drink: []
}
var modalBackground = document.querySelector(".modal-background");
var modal = document.querySelector(".modal");
var errorModal = document.getElementById("error-modal");
var errorType = document.querySelector(".error-type");
var recipe = "Recipe";
var ingredient = "Ingredient";

// The ingredients and amounts coming back from api were stored in seperated strings.  This function takes those
// strings and puts them into an array of objects so we can iterate through them to display on the page.
var createMealIngredientsList = function(data) {
    var ingredients = [{
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
    // clear the ingredient list 
    $(".ingredient-list").text("");
    // populate the ingredient list
    for (var i = 0; i < ingredients.length; i++) {
        // Not all of the recipes have 20 ingredients.  To ensure empty strings are not being added to the list of ingredients
        // we have this check in place that makes sure those properties aren't empty
        if (ingredients[i].ingredient && ingredients[i].amount) {
            $(".ingredient-list").append(`<li>${ingredients[i].amount} ${ingredients[i].ingredient}</li>`);
        }

    }
}

var createDrinkIngredientsList = function(data) {
    var ingredients = [{
            ingredient: data.drinks[0].strIngredient1,
            amount: data.drinks[0].strMeasure1
        },
        {
            ingredient: data.drinks[0].strIngredient2,
            amount: data.drinks[0].strMeasure2
        },
        {
            ingredient: data.drinks[0].strIngredient3,
            amount: data.drinks[0].strMeasure3
        },
        {
            ingredient: data.drinks[0].strIngredient4,
            amount: data.drinks[0].strMeasure4
        },
        {
            ingredient: data.drinks[0].strIngredient5,
            amount: data.drinks[0].strMeasure5
        },
        {
            ingredient: data.drinks[0].strIngredient6,
            amount: data.drinks[0].strMeasure6
        },
        {
            ingredient: data.drinks[0].strIngredient7,
            amount: data.drinks[0].strMeasure7
        },
        {
            ingredient: data.drinks[0].strIngredient8,
            amount: data.drinks[0].strMeasure8
        },
        {
            ingredient: data.drinks[0].strIngredient9,
            amount: data.drinks[0].strMeasure9
        },
        {
            ingredient: data.drinks[0].strIngredient10,
            amount: data.drinks[0].strMeasure10
        },
        {
            ingredient: data.drinks[0].strIngredient11,
            amount: data.drinks[0].strMeasure11
        },
        {
            ingredient: data.drinks[0].strIngredient12,
            amount: data.drinks[0].strMeasure12
        },
        {
            ingredient: data.drinks[0].strIngredient13,
            amount: data.drinks[0].strMeasure13
        },
        {
            ingredient: data.drinks[0].strIngredient14,
            amount: data.drinks[0].strMeasure14
        },
        {
            ingredient: data.drinks[0].strIngredient15,
            amount: data.drinks[0].strMeasure15
        },
    ];
    // clear the ingredient list
    $(".ingredient-list").text("");
    // populate the ingredient list
    for (var i = 0; i < ingredients.length; i++) {
        if (ingredients[i].ingredient && ingredients[i].amount) {
            $(".ingredient-list").append(`<li>${ingredients[i].amount} ${ingredients[i].ingredient}</li>`);
        }
    }

};

// Creates the modal to display the recipe information
var createMealModal = function(data) {
    var recipeTitle = data.meals[0].strMeal;
    var instructions = data.meals[0].strInstructions;
    var recipeImg = data.meals[0].strMealThumb;
    $(".recipe-title").text(recipeTitle);
    $(".instructions").text(instructions);
    $(".recipe-img").attr({ src: recipeImg, alt: recipeTitle });
    createMealIngredientsList(data);
    modal.classList.add("is-active");
}

var displayErrorModal = function(item, query) {
    $(errorType).text("");
    $(errorType).text(`${item} ${query} not found.`);
    errorModal.classList.add("is-active");
}

var displayAPIErrorModal = function() {
    $(errorType).text("");
    $(errorType).text(`Could not connect to API.`);
    errorModal.classList.add("is-active");
}

// Makes a call the the api using the id of the recipe that was clicked to show that recipes info
var displayMealRecipe = function(event) {
    event.preventDefault();
    var index = $(event.target).attr("data-index");

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    createMealModal(data);
                });
            } else {
                displayErrorModal(recipe, index);
            }
        })
        .catch(function(error) {
            displayAPIErrorModal();
        });

};

var createDrinkModal = function(data) {
    var drinkTitle = data.drinks[0].strDrink;
    var instructions = data.drinks[0].strInstructions;
    var recipeImg = data.drinks[0].strDrinkThumb;
    $(".recipe-title").text(drinkTitle);
    $(".instructions").text(instructions);
    $(".recipe-img").attr({ src: recipeImg, alt: drinkTitle });
    createDrinkIngredientsList(data);
    modal.classList.add("is-active");
}

var displayDrinkRecipe = function(event) {
    event.preventDefault();
    var index = $(event.target).attr("data-index");

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${index}`)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    createDrinkModal(data);
                });
            } else {
                displayErrorModal(recipe, index);
            }
        })
        .catch(function(error) {
            displayAPIErrorModal();
        });
}

var stopDisplayingRecipe = function(event) {
    modal.classList.remove("is-active");
}

var stopDisplayingError = function(event) {
        errorModal.classList.remove("is-active");
    }
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
            <div class="top-right is-size-1-mobile"><i class="far fa-star meal-star" id="meal-star" data-title="${recipeTitle}"></i></div>
            </div>
            <div class="card-content">
                <p class="title is-size-5">${recipeTitle}</p>
            </div>
            <footer class="card-footer">
                <p class="card-footer-item">
                    <button class="button recipe-button" data-index="${data.meals[i].idMeal}">View Recipe</button>
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
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    if (!data.meals) {
                        displayErrorModal(ingredient, query);
                    } else {
                        displayFoodCards(data);
                    }
                })
            } else {
                displayErrorModal(ingredient, query);
            }
        })
        .catch(function(error) {
            displayAPIErrorModal();
        })
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
                <div class="top-right is-size-1-mobile"><i class="far fa-star drink-star" id="drink-star" data-title="${recipeTitle}"></i></div>
            </div>
            <div class="card-content">
                <p class="title is-size-5">${recipeTitle}</p>
            </div>
            <footer class="card-footer">
            <p class="card-footer-item">
            <button class="button drink-button" data-index="${data.drinks[i].idDrink}">View Recipe</button>
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
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    if (!data.drinks) {
                        displayErrorModal(ingredient, query);
                    } else {
                        displayDrinkCards(data);
                    }
                })
            } else {
                displayErrorModal(ingredient, query);
            }
        })
        .catch(function(error) {
            displayAPIErrorModal();
        })
}

// EventListener for meal input
document.getElementById("meal-form").addEventListener("submit", function(event) {
    event.preventDefault();
    mealSearch(mealInput.value);
    mealStar()
    mealInput.value = "";
});

// EventListener for drink input
document.getElementById("drink-form").addEventListener("submit", function(event) {
    event.preventDefault();
    drinkSearch(drinkInput.value);
    drinkStar();
    drinkInput.value = "";
});

// when view recipe button is clicked it will call the displayMealRecipe function to display the modal
$(document).on("click", ".recipe-button", displayMealRecipe);
$(document).on("click", ".drink-button", displayDrinkRecipe);

// when background is clicked stop displaying modal
$(document).on("click", ".modal-background", stopDisplayingRecipe);
$(document).on("click", ".modal-background", stopDisplayingError);

// when x is clicked stop displaying modal
$(document).on("click", ".delete", stopDisplayingRecipe);
$(document).on("click", ".delete", stopDisplayingError);

// drink save start
function drinkStar() {
    var drinkStarInvterval = setInterval(function() {

        if ($("#drink-star").length) {

            $(".drink-star").on("click", function() {

                $(this).removeClass("far fa-star").addClass("fas fa-star save");
                console.log($(this).attr('data-title'));
                if (favorite.drink.indexOf($(this).attr('data-title')) === -1) {
                    favorite.drink.push($(this).attr('data-title'));
                    localStorage.setItem("favorite", JSON.stringify(favorite));
                }


            });
            $(".drink-star").on("dblclick", function() {
                $(this).removeClass("fas fa-star save").addClass("far fa-star");
                if (favorite.drink.indexOf($(this).attr('data-title')) !== -1) {
                    var index = favorite.drink.indexOf($(this).attr('data-title'));
                    favorite.drink.splice(index, 1);
                    localStorage.setItem("favorite", JSON.stringify(favorite));
                }


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
                console.log($(this).attr('data-title'));
                if (favorite.meal.indexOf($(this).attr('data-title')) === -1) {
                    favorite.meal.push($(this).attr('data-title'));
                    localStorage.setItem("favorite", JSON.stringify(favorite));
                }
                console.log(favorite.meal);
            });
            $(".meal-star").on("dblclick", function() {
                $(this).removeClass("fas fa-star save").addClass("far fa-star");
                if (favorite.meal.indexOf($(this).attr('data-title')) !== -1) {
                    var index = favorite.meal.indexOf($(this).attr('data-title'));
                    favorite.meal.splice(index, 1);
                    localStorage.setItem("favorite", JSON.stringify(favorite));
                }
                console.log(favorite.meal);
            });
            clearInterval(mealStarInvterval);
        }
    }, 1000);

}


// getting favorite drinks and meal from local storage
if (localStorage.getItem("favorite")) {
    favorite = JSON.parse(localStorage.getItem("favorite"))
}
// favorite star
if (favorite.drink.length === 0) {
    document.getElementById("drink-favorite-star").style.display = "none"
}
if (favorite.meal.length === 0) {
    document.getElementById("meal-favorite-star").style.display = "none"
}



// event listeners for showing favorite meals and drinks
document.getElementById("meal-favorite-star").addEventListener("click", function() {
    console.log(favorite.meal);
    creatFavoritMeal(favorite.meal);
});
document.getElementById("drink-favorite-star").addEventListener("click", function() {
    console.log(favorite.drink);
    creatFavoritdrink(favorite.drink)
});

function creatFavoritMeal(mealList) {
    console.log(mealList);
    recipesColumn.textContent = "";
    var i = 0;
    var interval = setInterval(function() {
            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealList[i]}`;
            fetch(url)
                .then(function(response) {
                    if (response.ok) {
                        response.json().then(function(data) {
                            console.log(data);
                            if (!data.meals) {
                                displayErrorModal(mealList[i]);
                            } else {
                                display()
                                mealListLoop(data);

                            }
                        })
                    } else {
                        displayErrorModal(mealList[i]);
                    }
                })
                .catch(function(error) {
                    displayAPIErrorModal();
                })
            i++;
            if (i === mealList.length) {

                mealStar()
                clearInterval(interval);
            }
        }, 1000)
        // for (i = 0; mealList.length; i++) {
    function display() {
        // if there are less than 4 recipes, we want to center the cards on the screen 
        if (favorite.meal.length < 4) {
            $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-centered");
        } else {
            $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-multiline is-centered");
        }


    }


    function mealListLoop(data) {
        for (var i = 0; i < data.meals.length; i++) {
            var recipeTitle = data.meals[i].strMeal;
            var recipeImage = data.meals[i].strMealThumb;
            $(recipesColumn).append(`<div class="column is-4-tablet is-3-desktop">
        <div class="card">
        
            <div class="card-image has-text-centered px-6">
            <img src="${recipeImage}" alt="${recipeTitle}">
            <div class="top-right is-size-1-mobile"><i class="far fa-star meal-star" id="meal-star" data-title="${recipeTitle}"></i></div>
            </div>
            <div class="card-content">
                <p class="title is-size-5">${recipeTitle}</p>
            </div>
            <footer class="card-footer">
                <p class="card-footer-item">
                    <button class="button recipe-button" data-index="${data.meals[i].idMeal}">View Recipe</button>
                </p>
            </footer>
        </div>
    </div>`);
            $(".meal-star").removeClass("far fa-star").addClass("fas fa-star save");
        }
    }
}

function creatFavoritdrink(drinkList) {
    console.log(drinkList);
    recipesColumn.textContent = "";
    var i = 0;
    var interval = setInterval(function() {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkList[i]}`;
        fetch(url)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        console.log(data);
                        if (!data.drinks) {
                            displayErrorModal(drinkList[i]);
                        } else {
                            display()
                            drinkListLoop(data);
                        }
                    })
                } else {
                    displayErrorModal(drinkList[i]);
                }
            })
            .catch(function(error) {
                displayAPIErrorModal();
            })
        i++;
        if (i === drinkList.length) {
            drinkStar()
            clearInterval(interval);
        }
    }, 1000)

    function display() {
        // if there are less than 4 recipes, we want to center the cards on the screen 
        if (favorite.drink.length < 4) {
            $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-centered");
        } else {
            $(recipesColumn).addClass("columns mt-5 is-8 is-variable is-multiline is-centered");
        }


    }

    function drinkListLoop(data) {
        for (var i = 0; i < data.drinks.length; i++) {
            var recipeTitle = data.drinks[i].strDrink;
            var recipeImage = data.drinks[i].strDrinkThumb;
            $(recipesColumn).append(`<div class="column is-4-tablet is-3-desktop">
        <div class="card">
            <div class="card-image has-text-centered px-6">
                <img src="${recipeImage}" alt="${recipeTitle}">
                <div class="top-right is-size-1-mobile"><i class="far fa-star drink-star" id="drink-star" data-title="${recipeTitle}"></i></div>
            </div>
            <div class="card-content">
                <p class="title is-size-5">${recipeTitle}</p>
            </div>
            <footer class="card-footer">
            <p class="card-footer-item">
            <button class="button drink-button" data-index="${data.drinks[i].idDrink}">View Recipe</button>
            </p>
            </footer>
        </div>
    </div>`);
            $(".drink-star").removeClass("far fa-star").addClass("fas fa-star save");
        }
    }
}