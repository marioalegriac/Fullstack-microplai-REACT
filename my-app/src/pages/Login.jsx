import React, { useState } from 'react';
import { validarLogin } from '../funciones/funciones';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUsuario }) {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const exito = await validarLogin(correo, password, setMensajeTexto, setMensajeVisible, setError);

    if (exito) {
      setCorreo('');
      setPassword('');

      const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
      setUsuario(usuarioLogueado);

      if (usuarioLogueado.rol === "ADMINISTRADOR") {
        navigate("/Administrador");
      }
    }
  };

  return (
    <div className="auth-container">

      <h2>Iniciar Sesión</h2>
      <p>Ingresa tu correo y contraseña para acceder.</p>

      {mensajeVisible && (
        <div className="auth-success">{mensajeTexto}</div>
      )}

      {error && (
        <div className="auth-error">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">

        <label>Correo Electrónico</label>
        <input
          type="email"
          placeholder="micorreo@gmail.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">Ingresar</button>

        <button
          type="button"
          className="auth-btn delete"
          onClick={() => {
            setCorreo('');
            setPassword('');
            setError('');
          }}
        >
          Borrar
        </button>

      </form>

    </div>
  );
}
