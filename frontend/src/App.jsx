import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import CategoryList from "./components/categoryList";
import LawList from "./components/lawList";
import Explanation from "./components/explaination";
import Chatbot from "./components/Chatbot";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [laws, setLaws] = useState([]);
  const [selectedLaw, setSelectedLaw] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [language, setLanguage] = useState("en");


  const audioRef = useRef(null);

  // Fetch categories on load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/laws/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Fetch Categories Error:", err));
  }, []);



  // Handle category selection
  const selectCategory = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      setSelectedLaw("");
      setExplanation("");

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        URL.revokeObjectURL(audioRef.current.src);
      }
      setAudioUrl("");

      // Fetch laws under the category
      const lawsRes = await axios.get(
        `http://localhost:5000/api/laws/${encodeURIComponent(category)}`
      );
      setLaws(lawsRes.data.laws);

      // ❌ Do NOT fetch AI story here
    } catch (err) {
      console.error("Fetch Laws Error:", err);
      setExplanation("Failed to load laws.");
    } finally {
      setLoading(false);
    }
  };

  // Handle law selection → fetch AI story
  const selectLaw = async (law) => {
    try {
      setLoading(true);
      setSelectedLaw(law);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        URL.revokeObjectURL(audioRef.current.src);
      }
      setAudioUrl("");

      // const res = await axios.post(
      //   "http://localhost:5000/api/laws/explain-law",
      //   { category: selectedCategory, law }
      // );

      const res = await axios.post(
        "http://localhost:5000/api/laws/explain-law",
        {
          category: selectedCategory,
          law,
          language
        }
      );


      setExplanation(res.data.explanation);
    } catch (err) {
      setExplanation("AI explanation not available.");
    } finally {
      setLoading(false);
    }
  };

  const playStoryAudio = async () => {
    if (!explanation) return;

    try {
      setLoading(true);

      const cleanText = explanation
        .replace(/#+\s/g, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "");

      // const res = await axios.post(
      //   "http://localhost:5000/api/tts/stream",
      //   { text: cleanText },
      //   { responseType: "blob" }
      // );

      const res = await axios.post(
        "http://localhost:5000/api/tts/stream",
        {
          text: cleanText,
          language
        },
        { responseType: "blob" }
      );


      const url = URL.createObjectURL(res.data);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(url);
      audioRef.current = audio;
      setAudioUrl(url);
      await audio.play();
    } catch (err) {
      alert("Failed to play story audio");
    } finally {
      setLoading(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <Navbar />

      <div className="app">
        <section id="home" className="hero">
          <div className="hero-content">
            <h1>"Indian Laws, Simplified for You"</h1>
            <p>
              <i>
                LegalEase brings Indian laws to life—understand them through AI-driven
                stories, clear explanations, and audio guides.
              </i>
            </p>
            <a href="#categories" className="hero-btn">
              Explore Categories
            </a>
          </div>
        </section>




        <div className="content-container">
          {/* ========= CATEGORIES ========= */}
          <section id="categories">
            <h2 className="section-title">Categories</h2>

            <div className="language-selector">
              <span className={language === "en" ? "lang active" : "lang"}>
                EN
              </span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={language === "hi"}
                  onChange={() => setLanguage(language === "en" ? "hi" : "en")}
                />
                <span className="slider"></span>
              </label>

              <span className={language === "hi" ? "lang active" : "lang"}>
                HI
              </span>
            </div>


            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={selectCategory}
            />
          </section>

          {/* ========= LAWS ========= */}
          <section id="laws">
            <h2 className="section-title">Laws</h2>
            <LawList
              laws={laws}
              selectedLaw={selectedLaw}
              onSelect={selectLaw}
            />
          </section>



          <Explanation text={explanation} loading={loading} />

          {/* ========= AUDIO BUTTONS ========= */}
          {explanation && (
            <div style={{ margin: "1rem 0" }}>
              <div className="audio-controls">
                <button
                  className="play-audio-btn"
                  disabled={loading}
                  onClick={playStoryAudio}
                >
                  🔊 Listen Story
                </button>
                <button
                  className="stop-audio-btn"
                  disabled={loading}
                  onClick={stopAudio}
                  style={{ marginLeft: "1rem" }}
                >
                  ⏹ Stop
                </button>
              </div>


            </div>

          )}

          {audioUrl && (
            <div className="audio-container">
              <audio controls src={audioUrl} autoPlay />
            </div>
          )}
        </div>
        <Chatbot />

        <section id="about" className="about-section">
          <div className="about-header">
            <h2>About LegalEase</h2>
            <p>
              Making legal learning simple, accessible, and engaging with AI-powered tools.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <div className="card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                Empower users with accurate legal knowledge and AI storytelling tools
                to simplify learning.
              </p>
            </div>

            <div className="about-card">
              <div className="card-icon">🌟</div>
              <h3>Our Vision</h3>
              <p>
                To be the leading platform where law meets technology for everyone.
              </p>
            </div>

            <div className="about-card">
              <div className="card-icon">💡</div>
              <h3>Our Values</h3>
              <ul>
                <li>Accessibility for all</li>
                <li>Innovation with AI</li>
                <li>Trust & Accuracy</li>
                <li>User-Friendly Experience</li>
              </ul>
            </div>

            <div className="about-card">
              <div className="card-icon">👩‍💻</div>
              <h3>Our Team</h3>
              <p>
                A passionate group of developers and AI enthusiasts building LegalEase.
              </p>
            </div>
          </div>
        </section>



        <Footer />
      </div>
    </>
  );
}

export default App;
