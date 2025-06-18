import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ToolList from "./components/ToolList";
import Favorites from "./components/Favorites";
import "./App.css";
function App() {
  // Always start with light mode unless 'dark' is stored
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? true : false;
  });

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>AI Tools Explorer</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>
            <button onClick={toggleTheme} className="theme-toggle">
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<ToolList />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
