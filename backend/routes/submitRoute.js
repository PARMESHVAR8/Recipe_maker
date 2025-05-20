const express = require("express");
const router = express.Router();
const { Ingredient, Recipe } = require("../models/submitModel");
const apiController = require("../controllers/apiController");

// ✅ Route to get ingredient suggestions
router.get("/ingredients", async (req, res) => {
  try {
    const query = req.query.q;
    const suggestions = await Ingredient.find({
      ingredient_name: { $regex: query, $options: "i" },
    }).limit(10);
    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/recipe", async (req, res) => {
  try {
    const { ingredients, duration } = req.body;
    console.log(req.body);

    const newRecipe = new Recipe({ ingredients, duration });
    const savedRecipe = await newRecipe.save(); // ✅ Save Recipe and get _id

    // ✅ Fetch Data and Save in `recipeget` Collection
    await apiController.fetchData(savedRecipe._id, ingredients, duration);

    res.json({ message: "Recipe submitted successfully!", recipeId: savedRecipe._id }); // ✅ Return ID
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
});


module.exports = router;
