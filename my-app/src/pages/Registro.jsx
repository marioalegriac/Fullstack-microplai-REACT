import React, { useState } from "react";
import { registrarUsuario } from "../funciones/funciones";

export default function Registro() {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState("");
  const [errores, setErrores] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrores([]);
    setMensajeVisible(false);
    setMensajeTexto("");

    await registrarUsuario(
      { nombre, apellido, correo, password, confirmPassword },
      setMensajeTexto,
      setMensajeVisible,
      setErrores
    );

    // Si salió OK
    if (mensajeTexto.includes("✅")) {
      setNombre("");
      setApellido("");
      setCorreo("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <section className="auth-container">
      <h2>Registro de Usuario</h2>

      {mensajeVisible && (
        <div className="auth-message auth-success">
          {mensajeTexto}
        </div>
      )}

      {errores.length > 0 && (
        <div className="auth-message auth-error">
          {errores.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">
          Registrarse
        </button>
      </form>

      <p className="auth-bottom-text">
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </section>
  );
}
