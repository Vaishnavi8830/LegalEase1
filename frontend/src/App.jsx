import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import CategoryList from "./components/categoryList";
import LawList from "./components/lawList";
import Explanation from "./components/explaination";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [laws, setLaws] = useState([]);
  const [selectedLaw, setSelectedLaw] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const audioRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/laws/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Fetch Categories Error:", err));
  }, []);

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

      const lawsRes = await axios.get(
        `http://localhost:5000/api/laws/${encodeURIComponent(category)}`
      );
      setLaws(lawsRes.data.laws);

      const explainRes = await axios.post(
        "http://localhost:5000/api/laws/explain-category",
        { category }
      );
      setExplanation(explainRes.data.explanation);
    } catch (err) {
      setExplanation("AI explanation not available.");
    } finally {
      setLoading(false);
    }
  };

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

      const res = await axios.post(
        "http://localhost:5000/api/laws/explain-law",
        { category: selectedCategory, law }
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

      const res = await axios.post(
        "http://localhost:5000/api/tts/stream",
        { text: cleanText },
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
        {/* ========= HERO / HOME SECTION ========= */}
        <section id="home" className="hero">
          <h1>"Indian Laws, Simplified for You" </h1>
          <p><i>
            LegalEase brings Indian laws to life—understand them through AI-driven stories, clear explanations, and audio guides.
          </i></p>
          <a href="#categories" className="hero-btn">
            Explore Categories
          </a>
        </section>

        <div className="content-container">
          {/* ========= CATEGORIES ========= */}
          <section id="categories">
            <h2 className="section-title">Categories</h2>
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

          {explanation && (
            <div style={{ margin: "1rem 0" }}>
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
          )}

          <Explanation text={explanation} loading={loading} />

          {audioUrl && (
            <div className="audio-container">
              <audio controls src={audioUrl} autoPlay />
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App; 