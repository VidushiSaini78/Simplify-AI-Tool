import React, { useEffect, useState } from "react";
import axios from "axios";
import ToolCard from "./ToolCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const res = await axios.get("http://localhost:5000/favorites");
    setFavorites(res.data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Favorite Tools</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {favorites.map(tool => (
          <ToolCard key={tool.id} tool={tool} isFav={true} refresh={fetchFavorites} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
