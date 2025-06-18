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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const toolsRes = await axios.get("http://localhost:5000/tools");
      const favsRes = await axios.get("http://localhost:5000/favorites");
      setTools(toolsRes.data);
      setFavorites(favsRes.data);
    };
    fetchData();
  }, []);

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  // Filter tools by category and search term
  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      <h2>All Tools</h2>

      {/* Category Selector */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", marginRight: "10px" }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Search by name input */}
      <input
        type="text"
        placeholder="Search by tool name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", marginBottom: "20px", width: "250px" }}
      />

      {/* Show message if no tools match */}
      {filteredTools.length === 0 ? (
        <p>No tools found for the selected filters.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} isFav={isFavorite(tool.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ToolList;
