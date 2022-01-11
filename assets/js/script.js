// fetching meal api
function mealSearch(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

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

mealSearch("beef");
drinkSearch("vodka");