const express = require('express');
const router = express.Router();
const { RecipeGet } = require('../models/getRecipeModel'); // ✅ Import RecipeGet Model

// ✅ GET Recipe by ID
router.get('/getrecipe/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await RecipeGet.findById(recipeId); // ✅ MongoDB से डेटा फेच करें

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (error) {
        console.error("❌ Error fetching recipe:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
