import React, { useEffect, useState } from "react";

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [mensajeVisible, setMensajeVisible] = useState(false);

  useEffect(() => {
  const actualizarDesdeStorage = () => {
    const nuevoCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(nuevoCarrito);
  };

  actualizarDesdeStorage();

  window.addEventListener("carritoActualizado", actualizarDesdeStorage);


  return () => {
    window.removeEventListener("carritoActualizado", actualizarDesdeStorage);
  };
}, []);

const actualizarYGuardar = (nuevoCarrito) => {
  setCarrito(nuevoCarrito);
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
};


  
  const aumentarCantidad = (id) => {
    const actualizado = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item
    );
    actualizarYGuardar(actualizado);
  };

  const disminuirCantidad = (id) => {
    const actualizado = carrito.map((item) =>
      item.id === id && (item.cantidad || 1) > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    );
    actualizarYGuardar(actualizado);
  };

  const eliminarDelCarrito = (id) => {
    const nuevo = carrito.filter((item) => item.id !== id);
    actualizarYGuardar(nuevo);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const pagarCarrito = () => {
    setMensajeVisible(true);
    setCarrito([]);
    localStorage.removeItem("carrito");
    setTimeout(() => setMensajeVisible(false), 2000);
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  );

  return (
    <div className="contenedor-carrito">
      {mensajeVisible && (
        <div className="mensaje-carrito">
          ✅ Compra realizada con éxito
        </div>
      )}

      <h2>
        <center>
          <strong>Carrito</strong>
        </center>
      </h2>

      <div className="contenedor-carrito">
        <div className="carrito-header">
          <div>Producto</div>
          <div>Cantidad</div>
          <div>Subtotal</div>
          <div>Acciones</div>
        </div>

        <div className="lista-carrito">
          {carrito.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              🛒 Tu carrito está vacío
            </p>
          ) : (
            carrito.map((item) => (
            <div className="carrito-item" key={item.id}>
              {/* Producto */}
              <div className="producto">
                <img src={item.imagen} alt={item.nombre} />
                <div className="producto-info">
                  <p className="nombre">{item.nombre}</p>
                  <p className="consola">{item.consola}</p>

                </div>
              </div>

                {/* Cantidad */}
              <div className="cantidad">
                <button onClick={() => disminuirCantidad(item.id)}>-</button>
                <span>{item.cantidad || 1}</span>
                <button onClick={() => aumentarCantidad(item.id)}>+</button>
              </div>

                 {/* Subtotal */}
              <div className="subtotal">
                {(item.precio * (item.cantidad || 1)).toLocaleString("es-CL")} CLP
              </div>

                {/* Acciones */}
              <div className="acciones">
                <button onClick={() => eliminarDelCarrito(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

        {/* Footer */}
      <div className="carrito-footer">
        <div className="total">
          <strong>
            Total: {total.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
          </strong>
        </div>

          <div className="carrito-botones">
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
          <button onClick={pagarCarrito}>Pagar</button>
        </div>
          </div>
        </div>
      </div>
  );
}

export default Carrito;
