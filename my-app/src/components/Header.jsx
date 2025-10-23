import React from "react";
import { Link } from "react-router-dom";
import LogoTienda from "../images/a/Logo Tienda.png"; 
import CarritoIcon from "../images/a/carrito.png";
import UsuarioIcon from "../images/a/usuario.png";

export default function Header() {
  return (
    <div id="header-wrapper">
      <header id="header" className="container">

        <h1>
          <Link to="/">
            <img src={LogoTienda} alt="Logo" height={150} width={150} />
          </Link>
        </h1>

        <nav id="nav">
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="#">Productos</Link>
              <ul>
                <li><Link to="/Play">PlayStation</Link></li>
                <li><Link to="/Xbox">Xbox</Link></li>
                <li><Link to="/Nintendo">Nintendo</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/About">Quienes somos</Link>
            </li>
            <li>
              <Link to="/Contacto">Contacto</Link>
            </li>
          </ul>
        </nav>

        {/* Icono de carrito */}
        <div className="cart-fixed">
          <Link to="/Carrito">
            <img src={CarritoIcon} alt="Carrito" />
          </Link>
        </div>

        {/* Icono de usuario con dropdown */}
        <div className="user_login">
          <img src={UsuarioIcon} alt="Usuario" />
          <ul className="user_dropdown">
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/registro">Registrarse</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
