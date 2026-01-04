import React from "react";
import "./categoryList.css";

const CategoryList = ({ categories, selectedCategory, onSelect }) => {
    return (
        <div className="category-list">
            {categories.map((cat) => (
                <button
                    key={cat}
                    className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => onSelect(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryList; 