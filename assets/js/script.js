var mealInput = document.getElementById("meal-input");
var drinkInput = document.getElementById("drink-input");


// fetching meal api
function mealSearch(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log(data.meals[0].strMeal);
            for (var i = 0; i < data.meals.length; i++) {
                console.log(data.meals[i].strMeal);
            }
        });
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