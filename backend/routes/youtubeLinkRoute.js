const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = "AIzaSyBahz1qK5TTtICfqG7y31POK09DniLsU7g"; // 🔹 अपना YouTube API Key डालें

// 📌 API Route to fetch the first YouTube video link
router.get("/getvideo", async (req, res) => {
    try {
        const searchQuery = req.query.q; // 🔹 URL से search_query लो
        if (!searchQuery) {
            return res.status(400).json({ error: "Missing search query" });
        }

        // 🔹 YouTube API URL तैयार करें
        const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${API_KEY}`;

        // 🔹 API से डेटा लाएं
        const response = await axios.get(API_URL);
        const firstVideoId = response.data.items[0]?.id.videoId;

        if (firstVideoId) {
            return res.json({ youtube_link: `https://www.youtube.com/watch?v=${firstVideoId}` });
        } else {
            return res.status(404).json({ error: "No video found" });
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
