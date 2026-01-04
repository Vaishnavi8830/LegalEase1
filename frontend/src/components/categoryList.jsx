import React from "react";
import "./categoryList.css";

const CategoryList = ({ categories, selectedCategory, onSelect }) => {
    return (
        <div className="category-list">
            {categories.map((cat) => (
                <div
                    key={cat}
                    className={`category-card ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => onSelect(cat)} // Make sure this is exactly "onSelect"
                >
                    <h3>{cat}</h3>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
