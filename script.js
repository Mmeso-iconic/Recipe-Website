const fetchMealData = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=beef');

        if (!response.ok) {
            throw new Error("The Network Response was not okay. Sorry about that.");
        }

        const data = await response.json();
        const meals = data.meals;

        if (!meals) {
            displayBeef([]);
            return;
        }

        displayBeef(meals);
    } catch (error) {
        console.error("Error fetching Beef data:", error);
        document.getElementById("mealContainer").innerHTML = "<p>Error loading meals.</p>";
    }
};

const displayBeef = (meals) => {
    const mealContainer = document.getElementById("mealContainer");
    mealContainer.innerHTML = "";

    if (!meals.length) {
        mealContainer.innerHTML = "<p>No meals found.</p>";
        return;
    }

    meals.forEach((meal) => {
        const card = document.createElement("div");
        card.className = "beef-card";

        const shortInstructions = meal.strInstructions.length > 150
            ? meal.strInstructions.substring(0, 150) + "..."
            : meal.strInstructions;

        const ingredients = [];
        for (let i = 1; i <= 5; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }

        const ingredientList = ingredients.map(ing => `<li>${ing}</li>`).join("");

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <h2 class="meal-title">${meal.strMeal}</h2>
            <p class="meal-description">${shortInstructions}</p>
            <ul class="meal-ingredients">${ingredientList}</ul>
            <a class="youtube-button" href="${meal.strYoutube}" target="_blank">Watch Video</a>
        `;

        mealContainer.appendChild(card);
    });
};



// Fetch initial data
fetchMealData();