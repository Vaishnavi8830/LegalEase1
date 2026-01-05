// import React from "react";
// import "./categoryList.css";

// const CategoryList = ({ categories, selectedCategory, onSelect }) => {
//     return (
//         <div className="category-list">
//             {categories.map((cat) => (
//                 <div
//                     key={cat.name}   // ✅ string key
//                     className={`category-card ${selectedCategory === cat.name ? "active" : ""
//                         }`}
//                     onClick={() => onSelect(cat.name)} // ✅ pass name only
//                 >
//                     <h3>{cat.name}</h3>  {/* ✅ render string */}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default CategoryList;



import React from "react";
import "./categoryList.css";

const categoryIcons = {
    "Constitutional Law": "📜",
    "Criminal Law": "⚖️",
    "Civil Law": "🏛️",
    "Property Law": "🏠",
    "Family Law": "👨‍👩‍👧",
    "Labor Law": "👷",
    "Environmental Law": "🌱",
    "Tax Law": "💰",
    "Intellectual Property Law": "💡",
    "Commercial Law": "🏢",
    "Information Technology Law": "💻",
    "Consumer Protection Law": "🛒",
    "RTO / Traffic Law": "🚦",
    "Women Safety Law": "🛡️",
    "Human Rights Law": "🤝",
};

const CategoryList = ({ categories, selectedCategory, onSelect }) => {
    return (
        <div className="category-list">
            {categories.map((cat) => (
                <div
                    key={cat.name}
                    className={`category-card ${selectedCategory === cat.name ? "active" : ""
                        }`}
                    onClick={() => onSelect(cat.name)}
                >
                    <h3>
                        <span className="category-icon">
                            {categoryIcons[cat.name] || "📚"}
                        </span>
                        {cat.name}
                    </h3>

                    <p className="category-desc">{cat.description}</p>

                    {/* 🔗 External official link */}
                    {cat.redirectUrl && (
                        <button
                            className="learn-more-btn"
                            onClick={(e) => {
                                e.stopPropagation(); // ✅ prevents card select
                                window.open(cat.redirectUrl, "_blank");
                            }}
                        >
                            Learn More ↗
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
