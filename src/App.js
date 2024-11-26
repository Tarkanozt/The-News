import React, { useState, useEffect } from "react";
import NewsList from "./components/NewsList";
import CategorySelector from "./components/CategorySelector";
import { fetchTopHeadlines } from "./api/newsApi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionSelector from "./components/SectionSelector";
import NewsGraph from "./components/NewsGraph";
import Loading from "./components/Loading";
import ErrorComponent from "./components/ErrorComponent";

const App = () => {
  const [category, setCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "General";
  });

  const [section, setSection] = useState(() => {
    return localStorage.getItem("selectedSection") || "News";
  });

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Request permission for notifications
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCategory", category);
  }, [category]);

  useEffect(() => {
    localStorage.setItem("selectedSection", section);
  }, [section]);

  // Getting the Data
  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before fetching
        const fetchedArticles = await fetchTopHeadlines(category);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles. Please check your configurations.");
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, [category]);

  return (
    <div>
      <Header />

      <SectionSelector selectedSection={section} onSectionChange={setSection} />

      <hr style={{ marginLeft: "20px", marginRight: "20px" }} />

      <CategorySelector
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      <div style={{ margin: "25px" }}>
        <h2>{`Latest News in ${category}`}</h2>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorComponent message={error} /> // Display error message
      ) : section === "News" ? (
        <NewsList articles={articles} />
      ) : (
        <NewsGraph articles={articles} />
      )}

      <Footer />
    </div>
  );
};

export default App;
