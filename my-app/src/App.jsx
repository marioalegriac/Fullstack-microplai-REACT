import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacto from "./pages/Contacto";
import Play from "./pages/Play";
import Xbox from "./pages/Xbox";
import Nintendo from "./pages/Nintendo";
import Carrito from "./pages/Carrito";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Detalle from "./pages/Detalle";
import Administrador from "./pages/Administrador";
import "./App.css";
import "./index.css";

function App() {
  const [usuario, setUsuario] = useState(() => {
    const stored = localStorage.getItem("usuario");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <MainLayout usuario={usuario} setUsuario={setUsuario}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Play" element={<Play />} />
        <Route path="/Xbox" element={<Xbox />} />
        <Route path="/Nintendo" element={<Nintendo />} />
        <Route path="/Carrito" element={<Carrito />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Login" element={<Login setUsuario={setUsuario} />} />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/detalle/:id" element={<Detalle />} />

        {/* Ruta admin protegida */}
        <Route
          path="/Administrador"
          element={usuario?.rol === "ADMINISTRADOR" ? <Administrador /> : <Home />}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
