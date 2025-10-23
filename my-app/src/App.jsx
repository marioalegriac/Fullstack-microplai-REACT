import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacto from "./pages/Contacto";
import Play from "./pages/Play";
import Xbox from "./pages/Xbox";
import Nintendo from "./pages/Nintendo";
import Carrito from "./pages/Carrito";
import "./App.css";
import "./index.css";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Play" element={<Play />} />
        <Route path="/Xbox" element={<Xbox />} />
        <Route path="/Nintendo" element={<Nintendo />} />
        <Route path="/Carrito" element={<Carrito />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
