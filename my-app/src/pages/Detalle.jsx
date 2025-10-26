import React from "react";
import { useParams } from "react-router-dom";
import { obtenerInfoJuego } from "../funciones/funciones";

function Detalle() {
  const { id } = useParams();
  const juego = obtenerInfoJuego(Number(id));
  const [mensajeVisible, setMensajeVisible] = React.useState(false);
  const [setMensajeTexto] = React.useState("");
  

  if (!juego) {
    return <p>Juego no encontrado</p>;
  }

  const agregarAlCarrito = (juego) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente=carritoActual.find((item) => item.id === juego.id);

    if (existente) {
      existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
      carritoActual.push({ ...juego, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    window.dispatchEvent(new Event("carritoActualizado"));
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 1500);
  }

  return (
    
    <div className="detalle-container">

        {mensajeVisible && (
        <div className="mensaje-carrito">
          ✅ Añadido al carrito
        </div>
      )}

      <div className="detalle-superior">
        <div className="caratula">
          <img src={`/${juego.imagen}`} alt={juego.nombre} />
        </div>

        <div className="detalle-info">
          <h1>{juego.nombre}</h1>
          <p className="precio">
            {juego.precio === 0
              ? "Gratis"
              : `$${juego.precio?.toLocaleString("es-CL")}`}
          </p>

          <button
              className="boton agregar-carrito"
              onClick={() => { 
                agregarAlCarrito(juego, setMensajeTexto, setMensajeVisible); 
              }}>
              Agregar al carrito
            </button>
        </div>
      </div>

      {juego.video && (
        <div className="detalle-inferior">
          <div className="video-container">
            <iframe
              src={juego.video}
              title={`Trailer de ${juego.nombre}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="descripcion-container">
            <p className="descripcion">{juego.descripcion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detalle;
