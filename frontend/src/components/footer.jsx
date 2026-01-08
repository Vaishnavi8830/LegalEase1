import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand */}
                <div className="footer-brand">
                    <h2>⚖️ LegalEase</h2>
                    <p>Your AI-powered legal learning companion.</p>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#categories">Categories</a></li>
                        <li><a href="#laws">Laws</a></li>
                        <li><a href="#ai-stories">AI Stories</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom text */}
            <div className="footer-bottom">
                <p>© 2025 LegalEase. All rights reserved.</p>
                <p>Made with ❤️ for Indian law enthusiasts!</p>
            </div>
        </footer>
    );
};

export default Footer;
