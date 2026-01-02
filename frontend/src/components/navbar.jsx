import React from "react";
import "./navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">📚 LegalEase</div>
            <ul className="navbar-links">
                <li><a href="#categories">Categories</a></li>
                <li><a href="#laws">Laws</a></li>
                <li><a href="#explanation">AI Stories</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
