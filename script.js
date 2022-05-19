const meals = document.getElementById("meals");

getRandomMeal();

async function getRandomMeal() {
    const respRand = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    
    const respRanData = await respRand.json();
    const randomMeal = respRanData.meals[0];
    console.log(randomMeal);

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const mealById = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);

}
async function getMealBySearch(name) {
    const mealByName = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name);
}

function addMeal(mealData, random = false) {
    const meal = document.createElement("div");
    meal.classList.add("meal");
    meal.innerHTML = `
        <div class="meal-header">
            ${
                random ? `
            <span class="random"> Random Recipe </span> ` 
            : "" 
            }
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <image class="fav-btn active" src="./assets/suit-heart-fill.svg"></image>
            </button>
        </div>
    `;

    //event listener to mark favorite meals by clicking the herart button
    meal.querySelector(".meal-body .fav-btn").addEventListener("click", () => {
        alert(`${mealData.strMeal} is now part of your favorite meals`);
    });

    meals.appendChild(meal);
}