// Sample Recipe Data
const recipes = [
  {
    name: "Fresh Veggie Salad",
    image: "https://images.unsplash.com/photo-1589308078053-8a089e7d8c65?fit=crop&w=600&q=80",
    ingredients: ["tomato", "lettuce", "cucumber"],
    description: "A quick and refreshing salad loaded with vitamins and fiber."
  },
  {
    name: "Whole Wheat Pasta",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?fit=crop&w=600&q=80",
    ingredients: ["pasta", "tomato", "olive oil"],
    description: "A healthy pasta dish with a light tomato sauce."
  },
  {
    name: "Fruit Smoothie",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?fit=crop&w=600&q=80",
    ingredients: ["milk", "banana", "strawberry"],
    description: "A sweet and healthy smoothie to start your day right."
  },
  {
    name: "Chickpea Curry",
    image: "https://images.unsplash.com/photo-1617196033665-21a9c2fca8e4?fit=crop&w=600&q=80",
    ingredients: ["chickpeas", "tomato", "onion"],
    description: "A protein-packed vegetarian curry full of flavor."
  }
];

// Scroll to input section when clicking "Explore Recipes"
function scrollToInput() {
  document.getElementById('input-section').scrollIntoView({ behavior: 'smooth' });
}

// Show Recipes based on input
function showRecipes() {
  const input = document.getElementById('ingredients').value.toLowerCase();
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = "";

  // Filter recipes based on ingredients entered
  const matchedRecipes = recipes.filter(recipe =>
    recipe.ingredients.some(ing => input.includes(ing))
  );

  if (matchedRecipes.length === 0) {
    recipeList.innerHTML = `<p style="text-align:center; font-size:1.2rem; color:#555;">No matching recipes found. Try different ingredients!</p>`;
    return;
  }

  matchedRecipes.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
    `;
    recipeList.appendChild(card);
  });
}
