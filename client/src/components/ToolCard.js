import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ToolCard.css"; // Add a new CSS file for clean structure

function ToolCard({ tool, isFav = false, refresh }) {
  const [fav, setFav] = useState(isFav);

  useEffect(() => {
    setFav(isFav);
  }, [isFav]);

  const toggleFavorite = async () => {
    if (fav) {
      await axios.delete(`http://localhost:5000/favorites/${tool.id}`);
    } else {
      await axios.post(`http://localhost:5000/favorites/${tool.id}`);
    }
    setFav(!fav);
    if (refresh) refresh();
  };

  return (
    <div className="tool-card">
      <button
        className={`heart-icon ${fav ? "active" : ""}`}
        onClick={toggleFavorite}
        title="Add to Favorites"
      >
        ♥
      </button>
      <h3>{tool.name}</h3>
      <p>{tool.excerpt}</p>
      <p><strong>Category:</strong> {tool.category}</p>
      <p><strong>Pricing:</strong> {tool.pricing}</p>
      <a href={tool.url} target="_blank" rel="noreferrer">Visit Tool</a>
    </div>
  );
}

export default ToolCard;
