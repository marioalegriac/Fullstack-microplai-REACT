import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/src/images/logoMicroplai.png" alt="MicroPlai" />
        </Link>
      </div>

      {/* Botón hamburguesa (solo visible en móviles) */}
      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Enlaces de navegación */}
      <nav className={`navbar-menu ${menuAbierto ? "activo" : ""}`}>
        <Link to="/" onClick={cerrarMenu}>Inicio</Link>
        <Link to="/Play" onClick={cerrarMenu}>PlayStation</Link>
        <Link to="/Xbox" onClick={cerrarMenu}>Xbox</Link>
        <Link to="/Nintendo" onClick={cerrarMenu}>Nintendo</Link>
        <Link to="/Blogs" onClick={cerrarMenu}>Blogs</Link>
        <Link to="/Contacto" onClick={cerrarMenu}>Contacto</Link>
      </nav>
    </header>
  );
}

export default Navbar;
