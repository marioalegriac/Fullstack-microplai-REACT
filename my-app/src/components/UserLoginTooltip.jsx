import React from "react";
import { Link } from "react-router-dom";


function UserLoginTooltip({ usuario, setUsuario }) {
  const handleCerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <div className="user_login">
      <img src="/images/a/usuario.png" alt="Usuario" />
      {usuario && <span className="tooltip_text">Logueado</span>}

      <ul className="user_dropdown">
        {usuario ? (
          <li>
            <button onClick={handleCerrarSesion}>Cerrar sesión</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/registro">Registrarse</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default UserLoginTooltip;
