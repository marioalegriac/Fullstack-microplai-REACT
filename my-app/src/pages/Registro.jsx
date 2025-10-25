import React, { useState } from 'react';
import { validarRegistro } from '../funciones/funciones';

function Registro() {
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    validarRegistro(setMensajeTexto, setMensajeVisible);
  };

  return (
    <div>
      <section className="form-container">
        <header>
          <h2>Registro de Usuario</h2>
          <p>Completa el formulario para registrarte.</p>
        </header>

        {/* Mensaje flotante */}
        {mensajeVisible && (
          <div className="mensaje-flotante">{mensajeTexto}</div>
        )}

        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="field">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingresa tu nombre.."
                required
              />
            </div>
            <div className="field">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Ingresa tu apellido.."
                required
              />
            </div>
            <div className="field">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="micorre@gmail.com.."
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="La contraseña debe tener minimo 5 caracteres y maximo 20.."
                required
              />
            </div>
            <div className="field">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                required
              />
            </div>
          </div>

          <div className="field" id="errores" style={{ color: "rgb(0, 0, 0)" }} />

          <ul className="actions">
            <li>
              <input type="submit" value="Registrarse" className="primary" />
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

export default Registro;
