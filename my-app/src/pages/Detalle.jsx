import React from "react";
import { useParams } from "react-router-dom";
import { obtenerInfoJuego, agregarAlCarrito } from "../funciones/funciones";

function Detalle() {
  const { id } = useParams(); // obtenemos el id desde la URL
  const juego = obtenerInfoJuego(parseInt(id)); // buscar juego por id
  const [mensajeVisible, setMensajeVisible] = React.useState(false);
  const [mensajeTexto, setMensajeTexto] = React.useState("");

  if (!juego) return <p>Juego no encontrado</p>;

  return (
    <div className="detalle-juego">
      {/* Mensaje flotante */}
      {mensajeVisible && (
        <div className="mensaje-carrito">
          {mensajeTexto}
        </div>
      )}

      <h2>{juego.nombre}</h2>
      <img src={juego.imagen} alt={juego.nombre} />
      <p>{juego.descripcion}</p>
      <p>
        Precio: {juego.precio === 0 ? "Gratis" : `$${juego.precio.toLocaleString("es-CL")}`}
      </p>

      <button
        className="boton agregar-carrito"
        onClick={() =>
          agregarAlCarrito(juego, setMensajeTexto, setMensajeVisible)
        }
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default Detalle;
