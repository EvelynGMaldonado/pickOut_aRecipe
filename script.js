getRandomMeal();

async function getRandomMeal() {
    const respRand = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    
    const respRanData = await respRand.json();
    const randomMeal = respRanData.meals[0];
    console.log(randomMeal);

    loadRandomMeal();
}

async function getMealById(id) {
    const mealById = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);

}
async function getMealBySearch(name) {
    const mealByName = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name);
}