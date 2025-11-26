import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COLUMNA 1 */}
        <div className="footer-col">
          <h3>Horario de atención</h3>
          <ul>
            <li>Lunes a Viernes: 08:00 - 19:30</li>
            <li>Sábado: 10:00 - 16:00</li>
          </ul>
        </div>

        {/* COLUMNA 2 */}
        <div className="footer-col">
          <h3>Contacto</h3>
          <ul>
            <li>microplaicontacto@gmail.com</li>
            <li>+569 1234 5678</li>
          </ul>
        </div>

        {/* COLUMNA 3 */}
        <div className="footer-col">
          <h3>¿Necesitas ayuda?</h3>
          <ul>
            <li><Link to="/Contacto">Contáctanos</Link></li>
            <li><Link to="/About">¿Quiénes somos?</Link></li>
            <li><Link to="/Play">Catálogo PlayStation</Link></li>
            <li><Link to="/Nintendo">Catálogo Nintendo</Link></li>
            <li><Link to="/Xbox">Catálogo Xbox</Link></li>
          </ul>
        </div>

        {/* COLUMNA 4 */}
        <div className="footer-col">
          <h3>Nuestras Redes</h3>
          <div className="footer-social">
            <a href="https://x.com/Microplaigaming" target="_blank">
              <img src="/images/a/twitter.png" alt="Twitter" />
            </a>
            <a href="https://www.instagram.com/microplai/" target="_blank">
              <img src="/images/a/instagram.png" alt="Instagram" />
            </a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-copy">
        © 2025 Microplai — Todos los derechos reservados | Desarrollado por Patricio Olguin y Mario Alegria
      </div>

    </footer>
  );
}
