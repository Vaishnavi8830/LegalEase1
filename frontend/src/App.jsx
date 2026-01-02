import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    axios.get("http://localhost:5000/api/laws/categories")
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error("Fetch Categories Error:", err));
  }, []);

  const selectCategory = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      setSelectedLaw("");
      setExplanation("");
      if (audioUrl) URL.revokeObjectURL(audioUrl); // Clean up memory
      setAudioUrl("");

      const lawsRes = await axios.get(`http://localhost:5000/api/laws/${encodeURIComponent(category)}`);
      setLaws(lawsRes.data.laws);

      const explainRes = await axios.post("http://localhost:5000/api/laws/explain-category", { category });
      setExplanation(explainRes.data.explanation);
    } catch (err) {
      setExplanation("AI explanation not available. Check your API key or network.");
    } finally {
      setLoading(false);
    }
  };

  const selectLaw = async (law) => {
    try {
      setLoading(true);
      setSelectedLaw(law);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl("");

      const res = await axios.post("http://localhost:5000/api/laws/explain-law", { category: selectedCategory, law });
      setExplanation(res.data.explanation);
    } catch (err) {
      setExplanation("AI explanation not available.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to handle Audio Logic for both Category and Law
  const handleAudioPlayback = async (endpoint, payload) => {
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:5000/api/laws/${endpoint}`, payload, {
        responseType: "blob",
      });

      // If backend sends JSON error inside a blob, parse it
      if (res.data.type === "application/json") {
        const text = await res.data.text();
        const error = JSON.parse(text);
        throw new Error(error.error || "Server failed to generate audio");
      }

      const url = URL.createObjectURL(res.data);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(url);

      const audio = new Audio(url);
      await audio.play();
    } catch (err) {
      console.error("Audio Error:", err);
      alert(err.message || "Failed to load audio. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="header">
        <h1>📚 LegalEase – Indian Laws Explorer</h1>
        <p>Learn Indian laws with fun AI stories 🇮🇳</p>
      </div>

      <h2 id="categories" className="section-title">Categories</h2>
      <CategoryList categories={categories} selectedCategory={selectedCategory} onSelect={selectCategory} />

      {selectedCategory && (
        <button className="play-audio-btn" onClick={() => handleAudioPlayback("explain-category-audio", { category: selectedCategory })}>
          🔊 Play Category Story Audio
        </button>
      )}

      <h2 id="laws" className="section-title">Laws</h2>
      <LawList laws={laws} selectedLaw={selectedLaw} onSelect={selectLaw} />

      {selectedLaw && (
        <button className="play-audio-btn" onClick={() => handleAudioPlayback("explain-law-audio", { category: selectedCategory, law: selectedLaw })}>
          🔊 Play Law Story Audio
        </button>
      )}

      <Explanation text={explanation} loading={loading} />

      {audioUrl && (
        <div className="audio-container">
          <p>Playing Audio Story...</p>
          <audio controls src={audioUrl} autoPlay style={{ marginTop: "10px", width: "100%" }} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;