// import React from "react";
// import "./explaination.css";
// import ReactMarkdown from "react-markdown";

// const Explanation = ({ text, loading }) => {
//     if (loading) return <div className="loading">🤖 Thinking...</div>;
//     if (!text) return null;

//     return (
//         <div id="explanation" className="explanation">
//             <h3>AI Explanation</h3>
//             <ReactMarkdown>{text}</ReactMarkdown>


//         </div>
//     );
// };

// export default Explanation; 


import React from "react";
import "./explaination.css";
import ReactMarkdown from "react-markdown";

const Explanation = ({ text, loading }) => {
    if (loading) return <div className="loading">🤖 Thinking...</div>;
    if (!text) return null;

    return (
        <div id="explanation" className="explanation">
            <h3>AI Explanation</h3>
            <ReactMarkdown
                components={{
                    h1: ({ node, children, ...props }) => (
                        <h4 {...props} style={{ color: "#fe424d", marginBottom: "0.5rem" }}>
                            {children}
                        </h4>
                    ),
                    h2: ({ node, children, ...props }) => (
                        <h4 {...props} style={{ color: "#fe424d", marginBottom: "0.5rem" }}>
                            {children}
                        </h4>
                    ),
                    h3: ({ node, children, ...props }) => (
                        <h4 {...props} style={{ color: "#fe424d", marginBottom: "0.5rem" }}>
                            {children}
                        </h4>
                    ),
                    p: ({ node, children, ...props }) => (
                        <p {...props} style={{ marginBottom: "1rem", lineHeight: "1.5" }}>
                            {children}
                        </p>
                    ),
                }}
            >
                {text.replace(/\*\*/g, "").replace(/\*/g, "")}
            </ReactMarkdown>
        </div>
    );
};

export default Explanation;