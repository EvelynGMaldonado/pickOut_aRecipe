//declare variables
const meals = document.getElementById("meals");
const favoriteGroup = document.getElementById("fav-meals");
const searchWord = document.getElementById("search-word");
const searchBtn = document.getElementById("search");

getRandomMeal();
favoriteMeals();

async function getRandomMeal() {
    const respRand = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    
    const respRanData = await respRand.json();
    const randomMeal = respRanData.meals[0];
    console.log(randomMeal);

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const respById = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respByIdData = await respById.json();
    const mealById = respByIdData.meals[0];
    return mealById;
}
async function getMealBySearch(name) {
    const respByName = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name);
    const respByNameData = await respByName.json();
    const mealByName = respByNameData.meals;
    return mealByName;
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
            alert(`Deleting ${mealData.strMeal} from your favorite meals`);
        } else {
            addFavoritesToLocalStorage(mealData.idMeal);
            likebtn.classList.add("active");
            alert(`${mealData.strMeal} is now part of your favorite meals`);
        }
        // likebtn.classList.toggle("active");
        
        favoriteMeals();
        

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

async function favoriteMeals() {
    favoriteGroup.innerHTML = "";
    const mealID = getFavoritesFromLocalStorage();
    // const favMealsGroup = [];
    for(let i = 0; i < mealID.length; i++){
        const meals = mealID[i];
        const meal = await getMealById(meals);
        addMealToFavorites(meal);
        // favMealsGroup.push(meal);
    }
    // console.log("favMealsGroup: ", favMealsGroup);

    //display meals in the browser
}

function addMealToFavorites(mealData) {
    console.log("mealData on addMealFavorites: ", mealData);
    const favoriteMeal = document.createElement("li");
    favoriteMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>
        ${mealData.strMeal}
        </span>
        <button class="delete"><img class="delete" alt="" src="./assets/x-circle.svg"></button>
        `;
    
    const deleteBtn = favoriteMeal.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
        removeFavoritesFromLocalStorage(mealData.idMeal);
        favoriteMeals();
    });
    favoriteGroup.appendChild(favoriteMeal);
}

searchBtn.addEventListener("click", async() => {
    meals.innerHTML="";
    const search = searchWord.value;
    const listByName = await getMealBySearch(search);
    console.log("recipe by name results: ", listByName);
    
    if(listByName) {
        listByName.forEach((recipe) => {
            addMeal(recipe);
        });
    }
});