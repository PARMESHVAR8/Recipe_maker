require("dotenv").config(); // Load environment variables
const dishRoutes = require('./routes/dishRoutes');
const getRecipeRoute = require('./routes/getRecipeRoute');
const express = require("express");
const mongoose = require("mongoose");
const videoRoutes = require("./routes/youtubeLinkRoute"); // File path adjust करें

const cors = require("cors");

const app = express();
app.use(express.json());

// ✅ Proper CORS Setup
app.use(cors()); 

const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Check if MONGO_URI is defined
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file!");
  process.exit(1); // Stop the server if no MongoDB URI is found
}

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if MongoDB fails to connect
  });

// ✅ Import Routes
app.use("/api", require("./routes/submitRoute"));
app.use('/api/dish', dishRoutes);
app.use('/api', getRecipeRoute); // ✅ Use new route
app.use("/api", videoRoutes);
// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
