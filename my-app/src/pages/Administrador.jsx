import React, { useEffect, useState } from "react";
import { cargarAdmins } from "../funciones/funciones";
import { cargarUsuarios } from "../funciones/funciones";
import { cargarOrdenes } from "../funciones/funciones";
import { agregarAdministrador } from "../funciones/funciones";
import { eliminarUsuario } from "../funciones/funciones";
import { generarReporte } from "../funciones/funciones";


function Administrador() {
  const [usuarios, setUsuarios] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [nuevoAdmin, setNuevoAdmin] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
  });

  const [mensajeTexto, setMensajeTexto] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);

  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    try {
      setUsuarios(await cargarUsuarios());
      setAdmins(await cargarAdmins());
      setOrdenes(await cargarOrdenes());
    } catch (error) {
      console.error("Error cargando datos:", error.message);
    }
  };

  const mostrarMensaje = (texto) => {
    setMensajeTexto(texto);
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 2000);
  };

  const handleAgregarAdmin = async () => {
    try {
      await agregarAdministrador(nuevoAdmin);
      mostrarMensaje("✅ Administrador agregado correctamente");
      setNuevoAdmin({ nombre: "", apellido: "", correo: "", contrasena: "" });
      setAdmins(await cargarAdmins());
    } catch (error) {
      mostrarMensaje("❌ " + error.message);
    }
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      await eliminarUsuario(id);
      mostrarMensaje("✅ Usuario eliminado correctamente");
      setUsuarios(await cargarUsuarios());
    } catch (error) {
      mostrarMensaje("❌ " + error.message);
    }
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  return (
    <section className="form-container">
      <h2>Panel de Administración</h2>

      {/* 🟢 Mensaje flotante tipo carrito */}
      {mensajeVisible && (
        <div className="mensaje-admin">{mensajeTexto}</div>
      )}

      {/* Usuarios */}
      <div className="admin-section">
        <h3>Usuarios Registrados</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.correo}</td>
                <td>
                  <button onClick={() => handleEliminarUsuario(u.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Administradores */}
      <div className="admin-section">
        <h3>Administradores</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id}>
                <td>{a.nombre}</td>
                <td>{a.apellido}</td>
                <td>{a.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Agregar nuevo administrador</h4>
        <input
          placeholder="Nombre"
          value={nuevoAdmin.nombre}
          onChange={(e) =>
            setNuevoAdmin({ ...nuevoAdmin, nombre: e.target.value })
          }
        />
        <input
          placeholder="Apellido"
          value={nuevoAdmin.apellido}
          onChange={(e) =>
            setNuevoAdmin({ ...nuevoAdmin, apellido: e.target.value })
          }
        />
        <input
          placeholder="Correo"
          value={nuevoAdmin.correo}
          onChange={(e) =>
            setNuevoAdmin({ ...nuevoAdmin, correo: e.target.value })
          }
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={nuevoAdmin.contrasena}
          onChange={(e) =>
            setNuevoAdmin({ ...nuevoAdmin, contrasena: e.target.value })
          }
        />

        <button onClick={handleAgregarAdmin}>Agregar Admin</button>
      </div>

      {/* Reportes */}
      <div
        className="admin-section"
        style={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Generar Reportes</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => generarReporte("usuarios", usuarios, admins, ordenes)}
            style={buttonStyle}
          >
            Usuarios
          </button>

          <button
            onClick={() => generarReporte("admins", usuarios, admins, ordenes)}
            style={buttonStyle}
          >
            Administradores
          </button>

          <button
            onClick={() => generarReporte("compras", usuarios, admins, ordenes)}
            style={buttonStyle}
          >
            Compras
          </button>
        </div>
      </div>
    </section>
  );
}

export default Administrador;