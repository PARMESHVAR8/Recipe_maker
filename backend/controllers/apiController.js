const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const { RecipeGet } = require('../models/getRecipeModel'); // ✅ Import RecipeGet Model

const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const apiKey = process.env.GOOGLE_API_KEY;

async function fetchData(recipeId, ingredients, duration) {
  const requestData = {
    "contents": [{
      "parts": [{
        "text": JSON.stringify({
          ingredients,
          duration,
          instructions: "Please give a response in the following format: " +
            "{ " +
            "\"dish_name\": \"Dish Name\", " +
            "\"youtube_link\": \"BEST VIDEO IN YOUTUBE THAT IS INDIAN\", " +
            "\"description\": \"Short description of the dish.\", " +
            "\"steps\": [" +
              "{\"step\": \"Step description.\", \"timer\": \"Step duration\"}," +
              "{\"step\": \"Another step.\", \"timer\": \"00:00:00\"}" +
            "]" +
            "}"
        })
      }]
    }]
  };

  try {
    const response = await axios.post(`${apiUrl}?key=${apiKey}`, requestData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const textContent = response.data.candidates[0].content.parts[0].text;
    let cleanedText = textContent.replace(/^```json|```$/g, '').trim();
    cleanedText = cleanedText.replace(/[^{}]*$/, '').trim();

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedText);
     

      // ✅ MongoDB में recipeget कलेक्शन में डेटा सेव करें
      const newRecipeGet = new RecipeGet({
        _id: recipeId, // ✅ उसी ID से सेव करना जो recipe में थी
        ingredients,
        duration,
        dish_name: parsedResponse.dish_name,
        youtube_link: parsedResponse.youtube_link,
        description: parsedResponse.description,
        steps: parsedResponse.steps
      });

      await newRecipeGet.save();
      console.log(`✅ Recipe data saved in recipeget collection with ID: ${recipeId}`);

      fs.writeFileSync('response.json', JSON.stringify(parsedResponse, null, 2));
      console.log('Response saved to response.json');
    } catch (error) {
      console.log("Error parsing JSON response:", error);
      
    }
  } catch (error) {
    console.error("❌ Error making API request:", error.response?.data || error.message);
  }
}

module.exports = { fetchData };
