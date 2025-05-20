const mongoose = require('mongoose');

const recipeGetSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "recipes" }, // ✅ वही ID इस्तेमाल होगी
  ingredients: [{ type: String, required: true }],
  duration: { type: String, required: true },
  dish_name: { type: String, required: true },
  youtube_link: { type: String, required: true },
  description: { type: String, required: true },
  steps: [{
    step: { type: String, required: true },
    timer: { type: String, required: true }
  }]
}, { collection: "recipeget" });

const RecipeGet = mongoose.model('RecipeGet', recipeGetSchema);

module.exports = { RecipeGet };
