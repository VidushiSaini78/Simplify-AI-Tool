import React, { useEffect, useState } from "react";
import axios from "axios";
import ToolCard from "./ToolCard";

// You can replace this with your own spinner component if you have one
function Spinner() {
  return <div style={{ padding: 20, fontSize: 20 }}>Loading...</div>;
}

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const toolsRes = await axios.get("http://localhost:5000/tools");
        const favsRes = await axios.get("http://localhost:5000/favorites");
        setTools(toolsRes.data);
        setFavorites(favsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  // Optional: simulate loading when changing filters/search (can be removed if instant filtering preferred)
  const handleCategoryChange = (e) => {
    setLoading(true);
    setSelectedCategory(e.target.value);
    setTimeout(() => setLoading(false), 300); // short delay to show spinner
  };

  const handleSearchChange = (e) => {
    setLoading(true);
    setSearchTerm(e.target.value);
    setTimeout(() => setLoading(false), 300); // short delay to show spinner
  };

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
        onChange={handleCategoryChange}
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
        onChange={handleSearchChange}
        style={{ padding: "8px", marginBottom: "20px", width: "250px" }}
      />

      {/* Show spinner while loading */}
      {loading ? (
        <Spinner />
      ) : filteredTools.length === 0 ? (
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
