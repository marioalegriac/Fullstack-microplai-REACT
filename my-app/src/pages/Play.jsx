import React, { useEffect, useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import { agregarAlCarrito } from '../funciones/funciones';

function Play() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState("");

  // ===========================
  // PAGINACIÓN
  // ===========================
  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 12;

  const totalPaginas = Math.ceil(juegos.length / itemsPorPagina);

  const juegosVisibles = useMemo(() => {
    const inicio = (pagina - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    return juegos.slice(inicio, fin);
  }, [pagina, juegos]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => {
        const filtrados = data.filter(j => j.consola === "PS5");
        setJuegos(filtrados);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar el catálogo");
        setCargando(false);
      });
  }, []);

  if (cargando) return <h2>Cargando catálogo...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <main className="catalog-page">

      {mensajeVisible && (
        <div className="mensaje-carrito">{mensajeTexto}</div>
      )}

      {/* TÍTULO */}
      <h2 className="console-title">PLAYSTATION</h2>

      {/* ========================
           VIDEO + TEXTO
         ======================== */}
      <div className="console-section">

        <div className="console-video">
          <iframe
            src="https://www.youtube.com/embed/RkC0l4iekYo"
            title="Presentacion PS5"
            allowFullScreen
          ></iframe>
        </div>

        {/* TEXTO --------------- */}
        <div className="console-text">
          <p>
            Sony es una de las marcas más reconocidas y exitosas en el mundo de
            los videojuegos. Lanzada por Sony Interactive Entertainment en 1994,
            revolucionó la industria con su enfoque en gráficos avanzados,
            experiencias inmersivas y una amplia biblioteca de juegos exclusivos.
            <br /><br />
            A lo largo de los años, PlayStation ha establecido un legado con consolas
            que han marcado generaciones, ofreciendo entretenimiento para millones
            de jugadores alrededor del mundo.
            <br /><br />
            La PlayStation 5 representa el último avance en esta saga, con un hardware
            de nueva generación, gráficos en 4K, SSD ultrarrápido y el innovador
            DualSense, que redefine la experiencia del jugador.
          </p>
        </div>

      </div>

      {/* TÍTULO CATÁLOGO */}
      <h2 className="console-title">Catálogo PlayStation</h2>

      {/* GRID DEL CATÁLOGO */}
      <div className="catalogo-page">
        {juegosVisibles.map((juego) => (
          <div key={juego.id} className="catalog-item">

            <Link to={`/detalle/${juego.id}`}>
              <img className="catalog-img" src={juego.imagen} alt={juego.nombre} />
            </Link>

            <div className="catalog-title">{juego.nombre}</div>

            <div className="catalog-desc">
              {juego.descripcion?.substring(0, 80)}...
            </div>

            <div className="catalog-price">
              {juego.precio.toLocaleString("es-CL")} CLP
            </div>

            <button
              className="catalog-add-btn"
              onClick={() =>
                agregarAlCarrito(juego, setMensajeTexto, setMensajeVisible)
              }
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div className="catalogo-paginacion">
          <button
            disabled={pagina === 1}
            onClick={() => setPagina(pagina - 1)}
          >
            ◀ Anterior
          </button>

          <span>
            Página {pagina} de {totalPaginas}
          </span>

          <button
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            Siguiente ▶
          </button>
        </div>
      )}

    </main>
  );
}

export default Play;
