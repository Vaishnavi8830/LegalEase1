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

  // ✅ Ref to store current Audio object
  const audioRef = useRef(null);

  // Load categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/laws/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Fetch Categories Error:", err));
  }, []);

  // Category selection (NO AUDIO HERE)
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

  // Law selection → generates STORY text
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

  // 🔊 AUDIO ONLY FOR STORY (explanation)
  const playStoryAudio = async () => {
    if (!explanation) {
      alert("Story not available yet");
      return;
    }

    try {
      setLoading(true);

      // Clean markdown symbols for TTS
      const cleanText = explanation
        .replace(/### Characters/g, "Characters:")
        .replace(/### Situation/g, "Situation:")
        .replace(/### Problem/g, "Problem:")
        .replace(/### Law Explanation/g, "Law Explanation:")
        .replace(/### What He Can Do Next/g, "What He Can Do Next:")
        .replace(/### Summary/g, "Summary:")
        .replace(/### Moral/g, "Moral:")
        .replace(/#+\s/g, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "");

      const res = await axios.post(
        "http://localhost:5000/api/tts/stream",
        { text: cleanText },
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(res.data);

      // Stop previous audio if any
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        URL.revokeObjectURL(audioRef.current.src);
      }

      // Create new audio and save in ref
      const audio = new Audio(url);
      audioRef.current = audio;
      setAudioUrl(url);

      await audio.play();
    } catch (err) {
      console.error("Audio Error:", err);
      alert("Failed to play story audio");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Stop Audio Function
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="header">
        <h1>📚 LegalEase – Indian Laws Explorer</h1>
        <p>Learn Indian laws with fun AI stories 🇮🇳</p>
      </div>

      <h2 className="section-title">Categories</h2>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={selectCategory}
      />

      <h2 className="section-title">Laws</h2>
      <LawList
        laws={laws}
        selectedLaw={selectedLaw}
        onSelect={selectLaw}
      />

      {/* 🔊 STORY AUDIO BUTTON (ONLY HERE) */}
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

      <Footer />
    </div>
  );
}

export default App;
