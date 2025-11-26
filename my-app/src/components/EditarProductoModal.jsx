// src/components/EditarProductoModal.jsx
import React, { useEffect, useState } from "react";
import { actualizarProductoPanelAdmin } from "../funciones/funciones";

export default function EditarProductoModal({
  visible,
  producto,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState({
    nombre: "",
    consola: "",
    precio: "",
  });

  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Rellenar formulario cuando cambie el producto seleccionado
  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre || "",
        consola: producto.consola || "",
        precio: producto.precio != null ? String(producto.precio) : "",
      });
      setErrores([]);
    }
  }, [producto]);

  if (!visible || !producto) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrores([]);

    try {
      await actualizarProductoPanelAdmin(producto.id, form);
      if (onSaved) await onSaved();
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
          <h2>Gestionar producto</h2>
          <button className="modal-cerrar" onClick={onClose} disabled={cargando}>
            ✕
          </button>
        </div>

        <form onSubmit={handleGuardar} className="modal-body">
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
                placeholder="PS5, Xbox, Nintendo, etc."
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
          </div>

          {errores.length > 0 && (
            <div className="modal-errores">
              {errores.map((e, i) => (
                <p key={i}>• {e}</p>
              ))}
            </div>
          )}

          <div className="modal-footer">
            <div className="modal-footer-right">
              <button
                type="button"
                className="btn-cancelar"
                onClick={onClose}
                disabled={cargando}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-guardar" disabled={cargando}>
                {cargando ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
