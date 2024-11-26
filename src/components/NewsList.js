import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { sendNotification } from "../utils/notification";

export default function NewsList({ articles }) {
  const [columns, setColumns] = useState("1fr"); // Default to 1 column

  const [displayedArticles, setDisplayedArticles] = useState([]);

  useEffect(() => {
    // Check for new articles
    if (
      displayedArticles.length > 0 &&
      articles.length > displayedArticles.length
    ) {
      const newArticles = articles.slice(
        0,
        articles.length - displayedArticles.length
      );
      newArticles.forEach((article) => {
        sendNotification(
          "New Article Published!",
          `${article.title} - ${article.source.name}`
        );
      });
    }

    // Update the list of displayed articles
    setDisplayedArticles(articles);
  }, [articles]);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1200) {
        setColumns("repeat(4, 1fr)"); // 4 columns for large screens
      } else if (window.innerWidth >= 992) {
        setColumns("repeat(3, 1fr)"); // 3 columns for medium screens
      } else if (window.innerWidth >= 768) {
        setColumns("repeat(2, 1fr)"); // 2 columns for small screens
      } else {
        setColumns("1fr"); // 1 column for very small screens
      }
    };

    // Initial check on component mount
    updateColumns();

    // Event listener for resizing the window
    window.addEventListener("resize", updateColumns);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return (
    <div style={{ ...styles.newsList, gridTemplateColumns: columns }}>
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}

const styles = {
  newsList: {
    display: "grid",
    gap: "20px",
    padding: "20px",
  },
};
