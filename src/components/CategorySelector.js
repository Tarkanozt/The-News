import React from "react";

const categories = [
  "General",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
  "Technology",
  "Business",
];

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div style={{ margin: "20px" }}>
      <h3
        style={{
          paddingTop: "3px",
          paddingBottom: "3px",
          paddingLeft: "10px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        Categories
      </h3>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          style={{
            height: 40,
            width: 120,
            margin: "5px",
            backgroundColor: selectedCategory === category ? "grey" : "#000",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: 15,
          }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
