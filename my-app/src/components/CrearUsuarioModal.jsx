import React, { useState } from "react";
import { registrarUsuarioPanelAdmin } from "../funciones/funciones";

export default function CrearUsuarioModal({ visible, onClose, onCreated }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    rol: "USUARIO",
  });

  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);

  if (!visible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "rol" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrores([]);

    try {
      await registrarUsuarioPanelAdmin(form);

      if (onCreated) onCreated();

      setForm({
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        rol: "USUARIO",
      });

      onClose();
    } catch (err) {
      console.error(err);
      setErrores(String(err.message || err).split("\n"));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <div className="modal-header">
          <h2>Crear usuario</h2>
          <button
            className="modal-cerrar"
            onClick={onClose}
            disabled={cargando}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="modal-campos">

            <label>
              Nombre:
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
            </label>

            <label>
              Apellido:
              <input type="text" name="apellido" value={form.apellido} onChange={handleChange} />
            </label>

            <label>
              Correo:
              <input type="email" name="correo" value={form.correo} onChange={handleChange} />
            </label>

            <label>
              Contraseña:
              <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange} />
            </label>

            <label>
              Rol (USUARIO o ADMINISTRADOR):
              <input type="text" name="rol" value={form.rol} onChange={handleChange} />
            </label>

          </div>

          {errores.length > 0 && (
            <div className="modal-errores">
              {errores.map((e, i) => <p key={i}>• {e}</p>)}
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="btn-cancelar" onClick={onClose} disabled={cargando}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar" disabled={cargando}>
              {cargando ? "Creando..." : "Crear usuario"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
