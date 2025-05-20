const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const apiKey = process.env.GOOGLE_API_KEY;

const requestData = {
  "contents": [{
    "parts": [{
      "text": JSON.stringify({
        ingredients: ["Tomato", "Onion", "Garlic", "Ginger", "Coriander", "Turmeric", "Salt", "Pepper", "Oil", "Butter"],
        duration: "00:30:00",
        instructions: "Please give a response in the following format: " +
          "{ " +
          "\"dish_name\": \"Dish Name\", " +
          "\"youtube_link\": \"BEST VIDEO IN YOUTUBE THAT IS INDIAN \", " +
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

async function makeApiRequest() {
    try {
      const response = await axios.post(`${apiUrl}?key=${apiKey}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const textContent = response.data.candidates[0].content.parts[0].text;
      console.log("Raw API Response:", textContent);
  
      // Remove the starting and ending backticks (```json and ```)
      let cleanedText = textContent.replace(/^```json|```$/g, '').trim();

      // Remove any non-JSON characters after the closing curly bracket
      // We can use a regex to capture only valid JSON content before any extra text
      cleanedText = cleanedText.replace(/[^{}]*$/, '').trim();

      console.log("Cleaned Text:", cleanedText);
  
      // Attempt to parse the cleaned response as JSON
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(cleanedText);
        console.log("Parsed Response:", parsedResponse);
  
        // Save the parsed response as a JSON file
        fs.writeFileSync('response.json', JSON.stringify(parsedResponse, null, 2));
        console.log('Response saved to response.json');
      } catch (error) {
        console.log("Error parsing JSON response:", error);
        console.log("Raw text response:", cleanedText);
      }
    } catch (error) {
      console.error("Error making API request:", error.response?.data || error.message);
    }
  }
  
  makeApiRequest();
