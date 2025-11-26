// src/components/EditarUsuarioModal.jsx
import React, { useEffect, useState } from "react";
import {
  actualizarUsuarioPanelAdmin,
  eliminarUsuario,
} from "../funciones/funciones";

import ConfirmarModal from "./ConfirmarModal";

export default function EditarUsuarioModal({
  visible,
  usuario,
  onClose,
  onSaved,
  onDeleted,
}) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    rol: "USUARIO",
    nuevaContrasena: "",
  });

  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Modal de confirmación
  const [confirmVisible, setConfirmVisible] = useState(false);

  // Rellena el formulario cuando recibimos usuario
  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre || "",
        apellido: usuario.apellido || "",
        correo: usuario.correo || "",
        rol: usuario.rol || "USUARIO",
        nuevaContrasena: "",
      });
      setErrores([]);
    }
  }, [usuario]);

  // Si no hay modal o usuario → no mostrar
  if (!visible || !usuario) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ==================== GUARDAR CAMBIOS ====================
  const handleGuardar = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrores([]);

    try {
      await actualizarUsuarioPanelAdmin(usuario.id, form);

      if (onSaved) onSaved(); // ← Actualiza tabla + mensaje
      onClose();             // ← Cierra modal
    } catch (err) {
      setErrores(String(err.message || err).split("\n"));
    } finally {
      setCargando(false);
    }
  };

  // ==================== ELIMINACIÓN ====================
  const confirmarEliminar = () => {
    setConfirmVisible(true);
  };

  const ejecutarEliminacion = async () => {
    setConfirmVisible(false);
    setCargando(true);
    setErrores([]);

    try {
      await eliminarUsuario(usuario.id);

      if (onDeleted) onDeleted(); // ← Admin.jsx muestra mensaje + refresca
      onClose();                 // ← Cierra modal principal
    } catch (err) {
      setErrores([err.message || "Error eliminando usuario"]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {/* ================= MODAL PRINCIPAL ================= */}
      <div className="modal-overlay">
        <div className="modal-contenido">
          <div className="modal-header">
            <h2>Gestionar usuario</h2>
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
                Apellido:
                <input
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                />
              </label>

              <label>
                Correo:
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                />
              </label>

              <label>
                Rol:
                <input
                  type="text"
                  name="rol"
                  value={form.rol}
                  onChange={handleChange}
                  list="lista-roles"
                />
                <datalist id="lista-roles">
                  <option value="USUARIO" />
                  <option value="ADMINISTRADOR" />
                  <option value="VENTAS" />
                </datalist>
              </label>

              <label>
                Nueva contraseña (opcional):
                <input
                  type="password"
                  name="nuevaContrasena"
                  value={form.nuevaContrasena}
                  onChange={handleChange}
                  placeholder="Dejar en blanco para no cambiarla"
                />
              </label>

            </div>

            {/* Errores */}
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
                className="btn-eliminar"
                onClick={confirmarEliminar}
                disabled={cargando}
              >
                🗑 Eliminar usuario
              </button>

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

      {/* ================= MODAL DE CONFIRMACIÓN ================= */}
      <ConfirmarModal
        visible={confirmVisible}
        mensaje={`¿Seguro que deseas eliminar al usuario "${usuario.nombre} ${usuario.apellido}"?`}
        onConfirm={ejecutarEliminacion}
        onCancel={() => setConfirmVisible(false)}
      />
    </>
  );
}
