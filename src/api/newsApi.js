import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

export const fetchTopHeadlines = async (category = "") => {
  try {
    const response = await axios.get(URL, {
      params: { category },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
