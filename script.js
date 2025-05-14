// FETCHING THE DATA

const fetchMealData = async () => {
    const query = document.getElementById("searchInput").value || "beef";
    const url = `https://themealdb.com/api/json/v1/1/search.php?s=beef`;

    try {
        const response = await fetch (url); //await the response from the url

    if (!response.ok){
        throw new Error("The Network Response was not okay. Sorry about that.")
    }

        const data = await response.json();
        const beef = data.meals;

    if (!beef) {
        displayBreakfast(null);
        return;
    }

    //Checking if the meals would display
    displayBeef(beef);
    } catch (error) {
    console.error("Error fetching Beef data:", error);
    document.getElementById("mealContainer").innerHTML = "<p>Error loading meals.</p>";
    }
};

const displayBeef = (beef) => {
    const mealContainer = document.getElementById("mealContainer");
    mealContainer.innerHTML = "";

    if (!beef || beef.length === 0) {
        mealContainer.innerHTML = "<p> No meals found.</p>";
    return;
    }

    beef.forEach((beef) => {
        const card = document.createElement("div");
        card.className = "beef-card";

        const shortInstructions = beef.strInstructions.length > 150
        ? beef.strInstructions.substring(0, 150) + "..."
        : beef.strInstructions;

        const ingredients = [];
        for (let i = 1; i <= 5; i++) {
            const ingredient = beef[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }

        const ingredientList = ingredients.map(ing => `<li>${ing}</li>`).join("");

        card.innerHTML = `
        <img src="${beef.strMealThumb}" alt="${beef.strMeal}" />
        <h2 class="meal-title">${beef.strMeal}</h2>
        <p class="meal-description">${shortInstructions}</p>
        <ul class="meal-ingredients">${ingredientList}</ul>
        <a class="youtube-button" href="${beef.strYoutube}" target="_blank">Watch Video</a>
    `;


    mealContainer.appendChild(card);

    });

};

fetchMealData();

document.getElementById("searchButton").addEventListener("click", fetchMealData);
