const mongoose = require("mongoose");

// Ingredient Schema
const ingredientSchema = new mongoose.Schema({
  ingredient_name: { type: String, required: true, unique: true }, // Prevent duplicates
}, { collection: "ingredients" }); // Explicit collection name

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  ingredients: [{ type: String, required: true }], // Array of ingredient names
  duration: { type: String, required: true, match: /^\d{2}:\d{2}:\d{2}$/ }, // Validate time format
}, { collection: "recipes" }); // Explicit collection name

// Models
const Ingredient = mongoose.model("Ingredient", ingredientSchema);
const Recipe = mongoose.model("Recipe", recipeSchema);

// Export models
module.exports = { Ingredient, Recipe };
