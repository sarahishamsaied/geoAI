import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ArcGIS3DComponent from "./components/3DMap/3DMap";
import Landing from "./pages/landing/Landing";
import Upload from "./pages/Upload/Upload";
import MapComponent from "./components/Map/Map";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/2d/dashboard" element={<Home />} />
      <Route path="/2d2/dashboard" element={<MapComponent />} />
      <Route path="/3d/dashboard" element={<ArcGIS3DComponent />} />
    </Routes>
  );
}

export default App;
