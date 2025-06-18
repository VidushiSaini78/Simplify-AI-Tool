import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ToolList from "./components/ToolList";
import Favorites from "./components/Favorites";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>AI Tools Explorer</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ToolList />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;  

