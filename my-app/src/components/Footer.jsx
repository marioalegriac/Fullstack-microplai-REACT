import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div id="footer-wrapper">
  <footer id="footer" className="container">
    <div className="row">
      <div className="col-3 col-6-medium col-12-small">
        {/* Links */}
        <section className="widget links">
          <h3>Horario de atencion</h3>
          <ul className="style2">
            <li>Lunes a Viernes:</li>
            <li>08:00 a 19:30 Hrs.</li>
            <li>Sabado:</li>
            <li>10:00 a 16:00 Hrs.</li>
          </ul>
        </section>
      </div>
      <div className="col-3 col-6-medium col-12-small">
        {/* Links */}
        <section className="widget links">
          <h3>Contacto</h3>
          <ul className="style2">
            <li>Email:</li>
            <li>microplaicontacto@gmail.com</li>
            <li>Numero:</li>
            <li>+569 1234 5678 </li>
          </ul>
        </section>
      </div>
      <div className="col-3 col-6-medium col-12-small">
        {/* Links */}
        <section className="widget links">
          <h3>¿Necesitas ayudas?</h3>
          <ul className="style2">
            <li>
              <a href="Contacto">Contactanos</a>
            </li>
            <li>
              <a href="About">¿Quienes somos?</a>
            </li>
            <li>
              <a href="Play">Catalogo PlayStation</a>
            </li>
            <li>
              <a href="Nintendo">Catalogo Nintendo</a>
            </li>
            <li>
              <a href="Xbox">Catalogo XBOX</a>
            </li>
            <li>Siguenos en nuestras redes</li>
          </ul>
        </section>
      </div>
      <div className="col-3 col-6-medium col-12-small">
        {/* Contact */}
        <section className="widget contact last">
          <h3>Nuestras Redes</h3>
          <ul>
            <li>
              <a
                href="https://x.com/Microplaigaming"
                className="icon brands fa-twitter"
              >
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/microplai/"
                className="icon brands fa-instagram"
              >
                <span className="label">Instagram</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div id="copyright">
          <ul className="menu">
            <li>© 2025 Microplai. Todos los derechos reservados</li>
            <li>Desarrollado por: Mario Alegria y Patricio Olguin</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>
</footer>
  );
}
