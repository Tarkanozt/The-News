const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const app = express();
const PORT = process.env.BACKEND_PORT || 8080;

app.use(cors());
app.use(express.json());

const BASE_URL = "https://newsapi.org/v2";

// PROXY SERVER
app.get("/", async (req, res) => {
  const { category = "", country = "us" } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        apiKey: process.env.NEWS_API_KEY, // Securely access the API key
        category,
        country,
      },
    });

    console.log(response);
    res.json(response.data.articles);
  } catch (error) {
    console.error("Error fetching news from NewsAPI:", error);
    res.status(500).json({ message: "Failed to fetch news articles" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
