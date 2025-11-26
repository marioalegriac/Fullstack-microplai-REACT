import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detalle() {
  const { id } = useParams();

  const [juego, setJuego] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mensajeVisible, setMensajeVisible] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/productos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Juego no encontrado");
        return res.json();
      })
      .then((data) => {
        setJuego(data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudo cargar la información del juego");
        setCargando(false);
      });
  }, [id]);

  const agregarAlCarrito = (juego) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existe = carrito.find((item) => item.id === juego.id);

    if (existe) {
      existe.cantidad = (existe.cantidad || 1) + 1;
    } else {
      carrito.push({ ...juego, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.dispatchEvent(new Event("carritoActualizado"));

    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 1500);
  };

  if (cargando) return <h2>Cargando información...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!juego) return <h2>Juego no encontrado</h2>;

  return (
    <main className="detalle-page">

      <Link to="/" className="volver-btn">← Volver atrás</Link>

      {mensajeVisible && (
        <div className="mensaje-carrito">✅ Añadido al carrito</div>
      )}

      <div className="detalle-container animated-shadow">

        {/* ===========================
            PANEL IZQUIERDO
        ============================ */}
        <div className="detalle-left">
          <img
            src={juego.imagen}
            alt={juego.nombre}
            className="detalle-img"
          />

          <div className="detalle-info">
            <h3><span className="label">Título:</span> {juego.nombre}</h3>
            <p className="detalle-consola">
              <span className="label">Consola:</span> {juego.consola}
            </p>

            <p className="detalle-precio">
              <span className="label">Precio:</span>{" "}
              {juego.precio === 0
                ? "Gratis"
                : `${juego.precio.toLocaleString("es-CL")} CLP`}
            </p>

            <button
              className="detalle-btn"
              onClick={() => agregarAlCarrito(juego)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>

        {/* ===========================
            VIDEO GRANDE
        ============================ */}
        {juego.video && (
          <div className="detalle-video-wrapper">
            <iframe
              className="detalle-video"
              src={juego.video}
              title={`Trailer de ${juego.nombre}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* ===========================
            PANEL DESCRIPCIÓN
        ============================ */}
        {juego.descripcion && (
          <aside className="detalle-description-panel">
            <h3>Descripción del juego</h3>
            <p>{juego.descripcion}</p>
          </aside>
        )}

      </div>
    </main>
  );
}

export default Detalle;
