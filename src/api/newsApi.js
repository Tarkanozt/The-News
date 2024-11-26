import axios from "axios";

const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async (category = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
        category,
        country: "us",
        pageSize: 100,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
