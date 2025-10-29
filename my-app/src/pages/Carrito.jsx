import React, { useEffect, useState } from "react";
import { actualizarCarritoReact, mostrarMensaje } from "../funciones/funciones";
import { confirmarCompraCarrito } from "../funciones/funciones";
import { llenarDatos } from "../funciones/funciones";

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estado para los datos del formulario
  const [datosFormulario, setDatosFormulario] = useState(llenarDatos());

  useEffect(() => {
    const nuevoCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(nuevoCarrito);
  }, []);

  const aumentarCantidad = (id) => {
    actualizarCarritoReact(carrito, setCarrito, setMensajeVisible, setMensajeTexto, id, "aumentar");
  };

  const disminuirCantidad = (id) => {
    actualizarCarritoReact(carrito, setCarrito, setMensajeVisible, setMensajeTexto, id, "disminuir");
  };

  const eliminarDelCarrito = (id) => {
    actualizarCarritoReact(carrito, setCarrito, setMensajeVisible, setMensajeTexto, id, "eliminar");
  };

  const vaciarCarrito = () => {
    if (carrito.length === 0) {
      mostrarMensaje(setMensajeTexto, setMensajeVisible, "❌ El carrito ya está vacío");
    } else {
      setCarrito([]);
      localStorage.removeItem("carrito");
      mostrarMensaje(setMensajeTexto, setMensajeVisible, "🛒 Carrito vaciado");
    }
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  );

  const handleFormularioChange = (e) => {
    const { id, value } = e.target;
    setDatosFormulario(prev => ({ ...prev, [id]: value }));
  };

  const handleConfirmarCompra = () => {
    confirmarCompraCarrito({
      carrito,
      setCarrito,
      setMensajeVisible,
      setMensajeTexto,
      setMostrarFormulario,
      datosFormulario // <-- ahora pasamos los datos del formulario
    });
  };

  return (
    <div className="contenedor-carrito">
      {mensajeVisible && <div className="mensaje-carrito">{mensajeTexto}</div>}

      <h2 style={{ textAlign: "center" }}>
        <strong>Carrito</strong>
      </h2>

      <div className="carrito-header">
        <div>Producto</div>
        <div>Cantidad</div>
        <div>Subtotal</div>
        <div>Acciones</div>
      </div>

      <div className="lista-carrito">
        {carrito.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "1rem" }}>🛒 Tu carrito está vacío</p>
        ) : (
          carrito.map((item) => (
            <div className="carrito-item" key={item.id}>
              <div className="producto">
                <img src={item.imagen} alt={item.nombre} />
                <div className="producto-info">
                  <p className="nombre">{item.nombre}</p>
                  <p className="consola">{item.consola}</p>
                </div>
              </div>

              <div className="cantidad">
                <button onClick={() => disminuirCantidad(item.id)}>-</button>
                <span>{item.cantidad || 1}</span>
                <button onClick={() => aumentarCantidad(item.id)}>+</button>
              </div>

              <div className="subtotal">
                {(item.precio * (item.cantidad || 1)).toLocaleString("es-CL")} CLP
              </div>

              <div className="acciones">
                <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="carrito-footer">
        <div className="total">
          <strong>
            Total: {total.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
          </strong>
        </div>

        <div className="carrito-botones">
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
          <button
            onClick={() =>
              mostrarFormulario
                ? handleConfirmarCompra()
                : setMostrarFormulario(true)
            }
          >
            {mostrarFormulario ? "Confirmar compra" : "Pagar"}
          </button>
        </div>
      </div>

      {/* Formulario debajo del carrito */}
      {mostrarFormulario && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirmarCompra();
          }}
          className="formulario-pago"
        >
          <h3>🧾 Datos de envío</h3>

          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            required
            value={datosFormulario.nombre}
            onChange={handleFormularioChange}
          />
          <input
            type="text"
            id="apellido"
            placeholder="Apellido"
            required
            value={datosFormulario.apellido}
            onChange={handleFormularioChange}
          />
          <input
            type="email"
            id="correo"
            placeholder="Correo electrónico"
            required
            value={datosFormulario.correo}
            onChange={handleFormularioChange}
          />
          <input
            type="text"
            id="direccion"
            placeholder="Dirección"
            required
            value={datosFormulario.direccion}
            onChange={handleFormularioChange}
          />
          <input
            type="text"
            id="indicaciones"
            placeholder="Indicaciones de entrega (opcional)"
            value={datosFormulario.indicaciones}
            onChange={handleFormularioChange}
          />

          <div className="botones-formulario">
            <button type="button" onClick={() => setMostrarFormulario(false)}>
              Cerrar formulario
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Carrito;
