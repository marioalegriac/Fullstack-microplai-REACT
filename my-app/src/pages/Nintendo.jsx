import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { agregarAlCarrito } from "../funciones/funciones";

function Nintendo() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState("");

  // ==================================
  // PAGINACIÓN
  // ==================================
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
        const filtrados = data.filter(
          (j) => j.consola === "NINTENDO SWITCH 2"
        );
        setJuegos(filtrados);
      })
      .catch(() => setError("No se pudo cargar el catálogo Nintendo"))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <h2>Cargando catálogo...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <main className="catalog-page">

      {/* Mensaje carrito */}
      {mensajeVisible && (
        <div className="mensaje-carrito">{mensajeTexto}</div>
      )}

      {/* TÍTULO */}
      <h2 className="console-title">NINTENDO</h2>

      {/* ========================
           VIDEO + TEXTO
         ======================== */}
      <div className="console-section">

        {/* VIDEO */}
        <div className="console-video">
          <iframe
            src="https://www.youtube.com/embed/0QeqO0kFz-E"
            title="Presentación Nintendo Switch 2"
            allowFullScreen
          ></iframe>
        </div>

        {/* TEXTO */}
        <div className="console-text">
          <p>
            Nintendo es una de las compañías más icónicas y queridas en la
            historia de los videojuegos. Fundada en Japón en 1889 y orientada
            al entretenimiento electrónico desde los años 80, ha sido
            responsable de crear franquicias legendarias como Super Mario,
            The Legend of Zelda y Pokémon.
            <br /><br />
            A lo largo de las décadas, Nintendo ha destacado por su enfoque en
            la jugabilidad, la innovación y las experiencias accesibles para 
            todas las edades. Consolas como la NES, Super Nintendo, Nintendo 64
            y Wii marcaron generaciones completas.
            <br /><br />
            Con la llegada de la Nintendo Switch, la compañía combinó el juego
            en casa con la portabilidad, ofreciendo una experiencia versátil y
            única que se convirtió en un éxito mundial.
            <br /><br />
            Ahora, con grandes expectativas, Nintendo prepara el lanzamiento de la
            Nintendo Switch 2, una consola que busca mantener la esencia híbrida
            de su predecesora, pero mejorando potencia gráfica, rendimiento y nuevas
            funciones. También se espera compatibilidad con títulos anteriores,
            reforzando el compromiso de la marca con su comunidad.
          </p>
        </div>

      </div>

      {/* TÍTULO CATÁLOGO */}
      <h2 className="console-title">Catálogo Nintendo</h2>

      {/* GRID DEL CATÁLOGO */}
      <div className="catalogo-page">
        {juegosVisibles.map((juego) => (
          <div key={juego.id} className="catalog-item">

            <Link to={`/detalle/${juego.id}`}>
              <img
                className="catalog-img"
                src={juego.imagen}
                alt={juego.nombre}
              />
            </Link>

            <div className="catalog-title">{juego.nombre}</div>

            <div className="catalog-price">
              {juego.precio === 0 ? "Gratis" : ""}
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

export default Nintendo;
