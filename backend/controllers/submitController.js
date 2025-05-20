const { Ingredient, Recipe } = require("../models/submitModel");

// Fetch ingredient suggestions
const Ingredient = require("../models/submitModel");

const getIngredients = async (req, res) => {
  try {
    const query = req.query.q || ""; // Get search query from frontend
    const ingredients = await Ingredient.find({
      ingredient_name: { $regex: query, $options: "i" } // Case-insensitive search
    }).limit(10); // Limit results to 10

    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getIngredients };


// Save recipe
exports.saveRecipe = async (req, res) => {
  try {
    const { ingredients, duration } = req.body;
    console.log("Received Recipe Data:", req.body);

    // Create new recipe
    const recipe = new Recipe({ ingredients, duration });
    const savedRecipe = await recipe.save();

    // Return recipe ID in response
    res.json({
      message: "Recipe saved successfully!",
      recipeId: savedRecipe._id, // ✅ Send MongoDB ID back
    });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
};

