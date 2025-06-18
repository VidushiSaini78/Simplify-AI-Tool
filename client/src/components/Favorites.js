import React, { useEffect, useState } from "react";
import axios from "axios";
import ToolCard from "./ToolCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get("http://localhost:5000/favorites");
      setFavorites(res.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container">
      <h2>Favorite Tools</h2>

      {favorites.length === 0 ? (
        <p style={{ fontSize: "18px", color: "#999", marginTop: "20px" }}>
          😕 Oops! No favorite tools found.
        </p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {favorites.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFav={true}
              refresh={fetchFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

