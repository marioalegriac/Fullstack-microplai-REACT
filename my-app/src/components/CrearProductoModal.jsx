import React, { useState } from "react";
import { crearProductoPanelAdmin } from "../funciones/funciones";

export default function CrearProductoModal({ visible, onClose, onCreated }) {
  const [form, setForm] = useState({
    nombre: "",
    consola: "",
    descripcion: "",
    video: "",
    precio: "",
    imagen: "",
  });

  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);

  if (!visible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrores([]);

    try {
      await crearProductoPanelAdmin(form);
      if (onCreated) onCreated();

      // reset
      setForm({
        nombre: "",
        consola: "",
        descripcion: "",
        video: "",
        precio: "",
        imagen: "",
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
          <h2>Crear producto</h2>
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
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </label>

            <label>
              Consola:
              <input
                type="text"
                name="consola"
                value={form.consola}
                onChange={handleChange}
              />
            </label>

            <label>
              Precio:
              <input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                min="0"
              />
            </label>

            <label>
              Imagen (URL):
              <input
                type="text"
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
              />
            </label>

            <label>
              Video (URL) (opcional):
              <input
                type="text"
                name="video"
                value={form.video}
                onChange={handleChange}
              />
            </label>

            <label>
              Descripción (opcional):
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={4}
              />
            </label>
          </div>

          {errores.length > 0 && (
            <div className="modal-errores">
              {errores.map((e, i) => (
                <p key={i}>• {e}</p>
              ))}
            </div>
          )}

          <div className="modal-footer">
            <button
              type="button"
              className="btn-cancelar"
              onClick={onClose}
              disabled={cargando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-guardar"
              disabled={cargando}
            >
              {cargando ? "Creando..." : "Crear producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
