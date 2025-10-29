import React, { useState } from 'react';
import { validarLogin } from '../funciones/funciones';
import { useNavigate } from 'react-router-dom'; // 👈 Import necesario

export default function Login({ setUsuario }) { 
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // 👈 Hook para navegación

  const handleSubmit = async (event) => {
    event.preventDefault();
    const exito = await validarLogin(correo, password, setMensajeTexto, setMensajeVisible, setError);

    if (exito) {
      setCorreo('');
      setPassword('');

      const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
      setUsuario(usuarioLogueado); 

      // 🔹 Redirigir automáticamente al panel admin solo si es admin
      if (usuarioLogueado.tipo === "admin") {
        navigate("/Administrador");
      }
    }
  };

  return (
    <div>
      <section className="form-container">
        <header>
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tu correo y contraseña para acceder.</p>
        </header>

        {mensajeVisible && <div className="mensaje-flotante">{mensajeTexto}</div>}
        {error && <div className="mensaje-flotante" style={{ background: '#fdd' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="fields">
            <div className="field">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="micorreo@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <ul className="actions">
            <li>
              <input type="submit" value="Ingresar" className="primary" />
            </li>
            <li>
              <input type="reset" value="Borrar" onClick={() => { setCorreo(''); setPassword(''); setError(''); }} />
            </li>
          </ul>
        </form>
      </section>
    </div>
  );
}
