// src/pages/Home.jsx
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { moverCarrusel, agregarAlCarrito } from "../funciones/funciones.js";

function Home() {

  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState("");
  const [productos, setProductos] = useState([]);
  const [errorCarga, setErrorCarga] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}:8080/api/productos/carrusel`)
      .then((res) => {
        if (!res.ok) throw new Error("Error cargando carrusel");
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch(() => setErrorCarga(true));
  }, []);

  return (
    <main className="home-page">

      {/* VIDEO + TEXTO */}
      <div className="section-video-texto">

        {/* VIDEO */}
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/ajh3YHJ6baI`}
            title="Trailer METAL GEAR SOLID Δ: SNAKE EATER"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* TEXTO */}
        <div className="texto-container home-texto">
          <p>
            El principio de todo. Una adaptación del juego METAL GEAR SOLID 3: SNAKE
            EATER de 2004, con la historia irresistible y el mundo fascinante que ya
            conoces, ahora con gráficos renovados y sonido 3D que potencian el
            ambiente selvático. Prepárate para la experiencia definitiva de
            supervivencia, sigilo y acción.
            <br /><br />

            La crisis en plena Guerra Fría con la que comenzó todo En plena Guerra
            Fría, Naked Snake, el hombre al que acabarían conociendo como Big Boss, se
            infiltra en la Unión Soviética para escoltar a un científico desertor,
            Sokolov.
            <br /><br />

            Sin embargo, la misión acaba siendo un fracaso cuando la mentora de Snake
            (The Boss, una soldado conocida como la madre de las fuerzas especiales)
            lo traiciona y Sokolov es capturado por el coronel Volgin del GRU.
            <br /><br />

            Una semana más tarde, Snake vuelve al territorio soviético para rescatar a
            Sokolov y eliminar a The Boss. Esta misión marcará el inicio de una nueva
            leyenda en el contexto de una historia marcada por constantes cambios.
            <br /><br />

            Todo lo que te encanta y todavía más. Vuelven la historia, los personajes,
            el doblaje, la jugabilidad y la música que causaron un gran impacto en una
            nueva versión para las consolas de la actual generación. Este salto
            evolutivo otorga a cada escena una nueva vida y reconstruye cada rincón
            del mundo.
          </p>
        </div>

      </div>

      {/* TÍTULO */}
      <h2 className="titulo-seccion">Productos destacados</h2>

      {/* MENSAJE CARRITO */}
      {mensajeVisible && (
        <div className="mensaje-carrito">{mensajeTexto}</div>
      )}

      {/* ERROR DE CARGA */}
      {errorCarga && (
        <p style={{ color: "red", textAlign: "center" }}>
          ❌ Error cargando productos destacados
        </p>
      )}

      {/* CARRUSEL */}
      <div className="carousel-container">
        <div className="carousel" id="carousel-productos">

          {productos.map((producto) => (
            <div key={producto.id} className="juego">

              <Link to={`/detalle/${producto.id}`}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="juego-imagen"
                />
              </Link>

              <div className="juego-info">
                <div className="titulo">{producto.nombre}</div>

                <div className="consola">
                  {producto.consola}
                </div>

                <div className="precio">
                  ${Number(producto.precio || 0).toLocaleString("es-CL")}
                </div>
              </div>

              <button
                className="boton agregar-carrito"
                onClick={() =>
                  agregarAlCarrito(
                    {
                      id: producto.id,
                      nombre: producto.nombre,
                      precio: producto.precio,
                      consola: producto.consola,
                      imagen: producto.imagen,
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

        {/* BOTONES */}
        <button className="carousel-btn prev" onClick={() => moverCarrusel(-1)}>
          ❮
        </button>

        <button className="carousel-btn next" onClick={() => moverCarrusel(1)}>
          ❯
        </button>

      </div>

    </main>
  );
}

export default Home;
