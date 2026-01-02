import React from "react";
import "./lawList.css";

const LawList = ({ laws, selectedLaw, onSelect }) => {
    return (
        <div className="law-list">
            {laws.map((law) => (
                <button
                    key={law}
                    className={`law-btn ${selectedLaw === law ? "active" : ""}`}
                    onClick={() => onSelect(law)}
                >
                    {law}
                </button>
            ))}
        </div>
    );
};

export default LawList;
