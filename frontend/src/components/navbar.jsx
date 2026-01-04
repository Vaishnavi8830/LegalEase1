import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo">
                ⚖️ <span>LegalEase</span>
            </div>

            {/* Hamburger Icon */}
            <div
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </div>

            {/* Links */}
            <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
                <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
                <li><a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a></li>
                <li><a href="#laws" onClick={() => setMenuOpen(false)}>Laws</a></li>
                <li>
                    <a
                        href="#ai-stories"
                        className="ai-btn"
                        onClick={() => setMenuOpen(false)}
                    >
                        ✨ AI Stories
                    </a>
                </li>
                <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
