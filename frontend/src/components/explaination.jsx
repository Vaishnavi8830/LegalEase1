import React from "react";
import "./explaination.css";

const Explanation = ({ text, loading }) => {
    if (loading) return <div className="loading">🤖 Thinking...</div>;
    if (!text) return null;

    return (
        <div id="explanation" className="explanation">
            <h3>AI Explanation</h3>
            <p>{text}</p>
        </div>
    );
};

export default Explanation;
