import React, { useState } from 'react';
import { validarLogin } from '../funciones/funciones';

export default function Login() {

  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    validarLogin(setMensajeTexto, setMensajeVisible);
  };

  return (
    <div>
      <section className="form-container">
        <header>
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tu correo y contraseña para acceder.</p>
        </header>

        {/* Mensaje flotante */}
        {mensajeVisible && (
          <div className="mensaje-flotante">{mensajeTexto}</div>
        )}

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="field">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="micorreo@gmail.com"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          <div className="field" id="erroresLogin" style={{ color: "rgb(0,0,0)" }} />

          <ul className="actions">
            <li>
              <input type="submit" value="Ingresar" className="primary" />
            </li>
            <li>
              <input type="reset" value="Borrar" />
            </li>
          </ul>
        </form>
      </section>
    </div>
  );
}
