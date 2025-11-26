// src/pages/Administrador.jsx
import React, { useEffect, useState } from "react";
import {
  cargarUsuarios,
  cargarOrdenes,
  generarReporte,
  cargarProductos,
} from "../funciones/funciones";

import TablaDinamica from "../TablaDinamica";

// Modales
import EditarUsuarioModal from "../components/EditarUsuarioModal";
import EditarProductoModal from "../components/EditarProductoModal";
import CrearUsuarioModal from "../components/CrearUsuarioModal";
import CrearProductoModal from "../components/CrearProductoModal";
import VerProductosModal from "../components/VerProductosModal";

export default function Administrador() {
  const [usuarios, setUsuarios] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [productos, setProductos] = useState([]);

  const [mensajeTexto, setMensajeTexto] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);

  const [vistaTabla, setVistaTabla] = useState("usuarios");
  const [filtroTexto, setFiltroTexto] = useState("");

  // MODALES DE EDICIÓN
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalUsuarioVisible, setModalUsuarioVisible] = useState(false);

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalProductoVisible, setModalProductoVisible] = useState(false);

  // MODALES DE CREACIÓN
  const [modalCrearUsuarioVisible, setModalCrearUsuarioVisible] = useState(false);
  const [modalCrearProductoVisible, setModalCrearProductoVisible] = useState(false);

  // =====================================================
  // CARGA INICIAL
  // =====================================================
  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    try {
      const users = await cargarUsuarios();
      const prods = await cargarProductos();
      const ord = await cargarOrdenes();

      setUsuarios(Array.isArray(users) ? users : []);
      setProductos(Array.isArray(prods) ? prods : []);
      setOrdenes(Array.isArray(ord) ? ord : []);
    } catch (error) {
      console.error("❌ Error cargando datos:", error);
    }
  };

  const mostrarMensaje = (texto) => {
    setMensajeTexto(texto);
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000);
  };

  // =====================================================
  // GESTIÓN USUARIOS
  // =====================================================
  const handleGestionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalUsuarioVisible(true);
  };

  const handleUsuarioGuardado = async () => {
    const users = await cargarUsuarios();
    setUsuarios(users);
    mostrarMensaje("✅ Usuario actualizado");
  };

  const handleUsuarioEliminado = async () => {
    const users = await cargarUsuarios();
    setUsuarios(users);
    mostrarMensaje("🗑 Usuario eliminado");
  };

  // =====================================================
  // GESTIÓN PRODUCTOS
  // =====================================================
  const handleGestionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setModalProductoVisible(true);
  };

  const handleProductoGuardado = async () => {
    const prods = await cargarProductos();
    setProductos(prods);
    mostrarMensaje("✅ Producto actualizado");
  };

  // =====================================================
  // TABLAS
  // =====================================================

  const usuariosNormales = usuarios.filter((u) => u.rol !== "ADMINISTRADOR");
  const administradores = usuarios.filter((u) => u.rol === "ADMINISTRADOR");

  let dataTabla = [];
  let columnasTabla = [];
  let sortDefault = { key: "id", direction: "asc" };
  let onGestionar = null;

  if (vistaTabla === "usuarios") {
    dataTabla = usuariosNormales;
    columnasTabla = [
      { key: "id", label: "ID", sortable: true, isNumeric: true },
      { key: "nombre", label: "Nombre", sortable: true },
      { key: "apellido", label: "Apellido", sortable: true },
      { key: "correo", label: "Correo", sortable: true },
      { key: "rol", label: "Rol", sortable: true },
    ];
    onGestionar = handleGestionarUsuario;
  }

  if (vistaTabla === "admins") {
    dataTabla = administradores;
    columnasTabla = [
      { key: "id", label: "ID", sortable: true },
      { key: "nombre", label: "Nombre", sortable: true },
      { key: "apellido", label: "Apellido", sortable: true },
      { key: "correo", label: "Correo", sortable: true },
      { key: "rol", label: "Rol", sortable: true },
    ];
  }

  if (vistaTabla === "productos") {
    dataTabla = productos;
    columnasTabla = [
      { key: "id", label: "ID", sortable: true },
      { key: "nombre", label: "Nombre", sortable: true },
      { key: "consola", label: "Consola", sortable: true },
      { key: "precio", label: "Precio", sortable: true, isNumeric: true },
    ];
    onGestionar = handleGestionarProducto;
  }

  if (vistaTabla === "compras") {
    dataTabla = ordenes.map((c) => ({
      id: c.id,
      cliente: `${c.nombre} ${c.apellido}`,
      correo: c.correo,
      fechaFormateada: new Date(c.fecha).toLocaleDateString("es-CL"),
      totalMostrar: c.total.toLocaleString("es-CL") + " CLP",

      // Texto resumido
      productos: c.productos
        .map((p) => `${p.producto_nombre} (${p.cantidad})`)
        .join(", "),

      // 🔥 Lo que usa el modal Ver Más
      productosRaw: c.productos,
    }));

    columnasTabla = [
      { key: "id", label: "ID", sortable: true },
      { key: "cliente", label: "Cliente", sortable: true },
      { key: "correo", label: "Correo", sortable: true },
      { key: "fechaFormateada", label: "Fecha", sortable: true },
      { key: "totalMostrar", label: "Total", sortable: true },
      { key: "productos", label: "Productos", sortable: false },
    ];

    sortDefault = { key: "fechaFormateada", direction: "desc" };
  }


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="admin-dashboard">

      <h2 className="admin-title">Panel de Administración</h2>

      {/* CARDS */}
      <div className="dashboard-cards">
        <div className="dashboard-card card-usuarios" onClick={() => setVistaTabla("usuarios")}>
          <h3>Usuarios Registrados</h3>
          <p>{usuariosNormales.length}</p>
          <i className="fas fa-user icono"></i>
        </div>

        <div className="dashboard-card card-productos" onClick={() => setVistaTabla("productos")}>
          <h3>Productos Totales</h3>
          <p>{productos.length}</p>
          <i className="fas fa-gamepad icono"></i>
        </div>

        <div className="dashboard-card card-compras" onClick={() => setVistaTabla("compras")}>
          <h3>Compras Realizadas</h3>
          <p>{ordenes.length}</p>
          <i className="fas fa-shopping-cart icono"></i>
        </div>

        <div className="dashboard-card card-admins" onClick={() => setVistaTabla("admins")}>
          <h3>Administradores</h3>
          <p>{administradores.length}</p>
          <i className="fas fa-user-shield icono"></i>
        </div>
      </div>

      {/* MENSAJE SUPERIOR */}
      {mensajeVisible && (
        <div className="mensaje-admin">
          <i className="fas fa-check-circle"></i>
          {mensajeTexto}
        </div>
      )}

      {/* TABLA */}
      <div className="admin-section">
        <h3>
          {vistaTabla === "usuarios" && "Usuarios Registrados"}
          {vistaTabla === "admins" && "Administradores"}
          {vistaTabla === "productos" && "Productos"}
          {vistaTabla === "compras" && "Compras Realizadas"}
        </h3>

        <TablaDinamica
          tipo={vistaTabla}
          data={dataTabla}
          columns={columnasTabla}
          filtroTexto={filtroTexto}
          setFiltroTexto={setFiltroTexto}
          sortDefault={sortDefault}
          onGestionar={onGestionar}
        />
      </div>

      {/* CREAR REGISTROS */}
      <div className="admin-section">
        <h3>Crear registros</h3>

        <div className="admin-actions">
          <button className="admin-btn" onClick={() => setModalCrearUsuarioVisible(true)}>
            Crear Usuario
          </button>

          <button className="admin-btn" onClick={() => setModalCrearProductoVisible(true)}>
            Crear Producto
          </button>
        </div>
      </div>

      {/* 📄 GENERAR REPORTES */}
      <div className="admin-section">
        <h3>Generar Reportes</h3>

        <div className="admin-actions">
          <button
            className="admin-btn"
            onClick={() => generarReporte("usuarios", usuarios, ordenes)}
          >
            Usuarios
          </button>

          <button
            className="admin-btn"
            onClick={() => generarReporte("admins", usuarios, ordenes)}
          >
            Administradores
          </button>

          <button
            className="admin-btn"
            onClick={() => generarReporte("compras", usuarios, ordenes)}
          >
            Compras
          </button>
        </div>
      </div>

      {/* MODALES */}
      <EditarUsuarioModal
        visible={modalUsuarioVisible}
        usuario={usuarioSeleccionado}
        onClose={() => setModalUsuarioVisible(false)}
        onSaved={handleUsuarioGuardado}
        onDeleted={handleUsuarioEliminado}
      />

      <EditarProductoModal
        visible={modalProductoVisible}
        producto={productoSeleccionado}
        onClose={() => setModalProductoVisible(false)}
        onSaved={handleProductoGuardado}
      />

      <CrearUsuarioModal
        visible={modalCrearUsuarioVisible}
        onClose={() => setModalCrearUsuarioVisible(false)}
        onCreated={async () => {
          const users = await cargarUsuarios();
          setUsuarios(users);
          mostrarMensaje("✅ Usuario creado correctamente");
        }}
      />

      <CrearProductoModal
        visible={modalCrearProductoVisible}
        onClose={() => setModalCrearProductoVisible(false)}
        onCreated={async () => {
          const prods = await cargarProductos();
          setProductos(prods);
          mostrarMensaje("✅ Producto creado correctamente");
        }}
      />

    </section>
  );
}
