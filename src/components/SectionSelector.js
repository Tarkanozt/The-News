import React from "react";

const sections = ["News", "Graphs"];

const SectionSelector = ({ selectedSection, onSectionChange }) => {
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
        Sections
      </h3>
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onSectionChange(section)}
          style={{
            height: 40,
            width: 120,
            margin: "5px",
            backgroundColor: selectedSection === section ? "grey" : "#000",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: 15,
          }}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default SectionSelector;
