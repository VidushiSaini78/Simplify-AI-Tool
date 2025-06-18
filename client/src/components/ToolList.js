import React, { useEffect, useState } from "react";
import axios from "axios";
import ToolCard from "./ToolCard";

const categories = [
  "All",
  "Writing",
  "Image",
  "Marketing",
  "Video",
  "Productivity",
  "Audio/Video Editing",
  "Video/Image",
  "Research",
  "Custom_Category"
];

function ToolList() {
  const [tools, setTools] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const toolsRes = await axios.get("http://localhost:5000/tools");
      const favsRes = await axios.get("http://localhost:5000/favorites");
      setTools(toolsRes.data);
      setFavorites(favsRes.data);
    };
    fetchData();
  }, []);

  const isFavorite = (id) => favorites.some(f => f.id === id);

  const filteredTools = selectedCategory === "All"
    ? tools
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div  className="container">
      <h2>All Tools</h2>

      {/* Category Selector */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ padding: "8px", marginBottom: "20px" }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Show message if no tools found */}
      {filteredTools.length === 0 ? (
        <p>No tools in this category.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} isFav={isFavorite(tool.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ToolList;
