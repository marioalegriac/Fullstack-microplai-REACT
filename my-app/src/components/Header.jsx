import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header({ usuario, setUsuario }) {

  const [sidebarActivo, setSidebarActivo] = useState(false);
  const [menuUsuarioMobile, setMenuUsuarioMobile] = useState(false);

  // Cerrar dropdown usuario al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".user_login")) {
        setMenuUsuarioMobile(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function toggleSidebar() {
    setSidebarActivo(!sidebarActivo);
    setMenuUsuarioMobile(false);
  }

  return (
    <>
      {/* HEADER DESKTOP */}
      <header className="header">

        {/* IZQUIERDA */}
        <div className="header-left">
          <button className="menu-btn" onClick={toggleSidebar}>☰</button>

          <Link to="/" className="logo">
            <img src="/images/a/logo_sin_fondo.png" alt="Logo" />
          </Link>
        </div>

        {/* NAV DESKTOP */}
        <nav className="nav-desktop">
          <Link to="/">Inicio</Link>

          <div className="dropdown-hover">
            <span>Productos ▾</span>
            <div className="dropdown-content">
              <Link to="/Play">PlayStation</Link>
              <Link to="/Xbox">Xbox</Link>
              <Link to="/Nintendo">Nintendo</Link>
            </div>
          </div>

          <Link to="/About">Quienes somos</Link>
          <Link to="/Contacto">Contacto</Link>
          <Link to="/Blogs">Blogs</Link>

          {usuario?.rol === "ADMINISTRADOR" && (
            <Link to="/Administrador">Administración</Link>
          )}
        </nav>

        {/* ICONOS DERECHA */}
        <div className="header-icons">

          {/* Carrito */}
          <Link to="/Carrito" className="header-icon">
            <img src="/images/a/carrito.png" alt="Carrito" />
          </Link>

          {/* Usuario */}
          <div
            className="user_login header-icon"
            onClick={() => setMenuUsuarioMobile(!menuUsuarioMobile)}
          >
            <img
              src="/images/a/usuario.png"
              alt="Usuario"
              className={usuario ? "user-icon-online" : ""}
            />

            {usuario ? (
              <ul className={`user_dropdown ${menuUsuarioMobile ? "activo" : ""}`}>
                <li className="dropdown-title">🟢 Sesión activa</li>
                <li>
                  <button
                    className="dropdown-btn"
                    onClick={() => {
                      setUsuario(null);
                      setMenuUsuarioMobile(false);
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            ) : (
              <ul className={`user_dropdown ${menuUsuarioMobile ? "activo" : ""}`}>
                <li><Link to="/login">Iniciar sesión</Link></li>
                <li><Link to="/registro">Registrarse</Link></li>
              </ul>
            )}
          </div>

        </div>
      </header>

      {/* SIDEBAR MOBILE */}
      <aside className={`sidebar ${sidebarActivo ? "activo" : ""}`}>
        <nav className="nav-mobile">

          <Link to="/" onClick={toggleSidebar}>Inicio</Link>

          <div className="mobile-group">
            <span>Productos ▾</span>
            <Link to="/Play" onClick={toggleSidebar}>PlayStation</Link>
            <Link to="/Xbox" onClick={toggleSidebar}>Xbox</Link>
            <Link to="/Nintendo" onClick={toggleSidebar}>Nintendo</Link>
          </div>

          <Link to="/About" onClick={toggleSidebar}>Quienes somos</Link>
          <Link to="/Contacto" onClick={toggleSidebar}>Contacto</Link>
          <Link to="/Blogs" onClick={toggleSidebar}>Blogs</Link>

          {usuario?.rol === "ADMINISTRADOR" && (
            <Link to="/Administrador" onClick={toggleSidebar}>
              Administración
            </Link>
          )}

          {/* ICONOS MOBILE */}
          <div className="sidebar-icons">

            {/* CARRITO */}
            <Link 
              to="/Carrito" 
              onClick={toggleSidebar} 
              className="sidebar-icon carrito"
            >
              <img src="/images/a/carrito.png" alt="Carrito" />
            </Link>

            {/* USUARIO */}
            <div
              className="sidebar-icon usuario user_login"
              onClick={() => setMenuUsuarioMobile(!menuUsuarioMobile)}
            >
              <img src="/images/a/usuario.png" alt="Usuario" />

              <ul className={`user_dropdown ${menuUsuarioMobile ? "activo" : ""}`}>
                {usuario ? (
                  <>
                    <li className="dropdown-title">🟢 Sesión activa</li>
                    <li>
                      <button
                        className="dropdown-btn"
                        onClick={() => {
                          setUsuario(null);
                          setMenuUsuarioMobile(false);
                          toggleSidebar();
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login" onClick={toggleSidebar}>Iniciar sesión</Link></li>
                    <li><Link to="/registro" onClick={toggleSidebar}>Registrarse</Link></li>
                  </>
                )}
              </ul>
            </div>

          </div>

        </nav>
      </aside>

      {/* OVERLAY */}
      <div
        className={`sidebar-overlay ${sidebarActivo ? "activo" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
}
