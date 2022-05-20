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
    console.log("mealData: ", mealData);
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
                <img class="fav-btn" src="./assets/heart.svg"></img>
            </button>
        </div>
    `;

    //event listener to mark favorite meals by clicking the herart button
    const likebtn = meal.querySelector(".meal-body .fav-btn");
    likebtn.addEventListener("click", () => {
        if(likebtn.classList.contains("active")) {
            removeFavoritesFromLocalStorage(mealData.idMeal);
            likebtn.classList.remove("active");
        } else {
            addFavoritesToLocalStorage(mealData.idMeal);
            likebtn.classList.add("active");
        }
        // likebtn.classList.toggle("active");
        alert(`${mealData.strMeal} is now part of your favorite meals`);

    });

    meals.appendChild(meal);
}

function addFavoritesToLocalStorage(favmeal) {
    const mealID = getFavoritesFromLocalStorage();
    localStorage.setItem("mealid", JSON.stringify([...mealID, favmeal]));

}

function removeFavoritesFromLocalStorage(favmeal) {
    const mealID = getFavoritesFromLocalStorage();
    localStorage.setItem("mealid", JSON.stringify(mealID.filter(id => id !== favmeal)));
}

function getFavoritesFromLocalStorage() {
    //we get item by key("mealid") from local storage.  
    const mealID = JSON.parse(localStorage.getItem("mealid"));
    return mealID === null ? [] : mealID;
}