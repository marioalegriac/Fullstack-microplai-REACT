import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { agregarAlCarrito } from "../funciones/funciones";

function Xbox() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState("");

  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 12;

  const totalPaginas = Math.ceil(juegos.length / itemsPorPagina);

  const juegosVisibles = useMemo(() => {
    const inicio = (pagina - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    return juegos.slice(inicio, fin);
  }, [pagina, juegos]);

  useEffect(() => {
    setCargando(true);
    setError(null);

    const cargar = async () => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_API_URL}:8080/api/productos`
        );

        if (!resp.ok) {
          throw new Error("Error al conectar con la API");
        }

        const data = await resp.json();

        const filtrados = data.filter(
          (j) => j.consola === "XBOX SERIES X|S"
        );

        setJuegos(filtrados);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el catálogo");
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  if (cargando)
    return <h2 style={{ textAlign: "center" }}>Cargando catálogo...</h2>;

  if (error)
    return (
      <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>
    );

  return (
    <main className="catalog-page">

      {/* Mensaje carrito */}
      {mensajeVisible && (
        <div className="mensaje-carrito">{mensajeTexto}</div>
      )}

      {/* TÍTULO */}
      <h2 className="console-title">XBOX</h2>

      {/* VIDEO + TEXTO */}
      <div className="console-section">

        <div className="console-video">
          <iframe
            src="https://www.youtube.com/embed/0tUqIHwHDEc"
            title="Presentación Xbox Series X"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="console-text">
          <p>
            Xbox es la división de videojuegos de Microsoft, fundada en 2001 con el 
            lanzamiento de su primera consola. Desde entonces se ha convertido en una 
            de las marcas más influyentes del gaming, impulsando servicios como 
            Xbox Live, Xbox Game Pass y compatibilidad entre dispositivos.
            <br /><br />
            La Xbox Series X representa el mayor salto tecnológico de la marca, 
            ofreciendo 4K nativo, tiempos de carga ultrarrápidos gracias a su SSD 
            personalizado y compatibilidad con miles de juegos de generaciones 
            anteriores, reforzando el compromiso de Microsoft con su comunidad.
          </p>
        </div>

      </div>

      {/* TÍTULO CATÁLOGO */}
      <h2 className="console-title">Catálogo Xbox</h2>

      {/* GRID DEL CATÁLOGO */}
      <div className="catalogo-page">

        {juegosVisibles.map((juego) => (
          <div key={juego.id} className="catalog-item">

            <Link to={`/detalle/${juego.id}`}>
              <img
                src={juego.imagen}
                alt={juego.nombre}
                className="catalog-img"
              />
            </Link>

            <div className="catalog-title">{juego.nombre}</div>

            <div className="catalog-price">
              {Number(juego.precio || 0) === 0
                ? "Gratis"
                : `${Number(juego.precio).toLocaleString("es-CL")} CLP`}
            </div>

            <button
              className="catalog-add-btn"
              onClick={() =>
                agregarAlCarrito(
                  {
                    id: juego.id,
                    nombre: juego.nombre,
                    precio: juego.precio,
                    consola: juego.consola,
                    imagen: juego.imagen,
                  },
                  setMensajeTexto,
                  setMensajeVisible
                )
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

export default Xbox;
