import React, { useState } from "react";
import { moverCarrusel } from "../funciones/funciones.js";


function Home() {
  const [mensajeVisible, setMensajeVisible] = useState(false);

  const productos = [
    {
      id: 1,
      nombre: "Metal Gear Solid V: The Phantom Pain",
      descripcion: "PS5",
      precio: 74990,
      imagen: "/images/play/Metal gear solid Snake eater PS5.png",
    },
    
    {
      id: 19,
      nombre: "Metal Gear Solid Snake Eater",
      descripcion: "XBOX Series X|S",
      precio: 69990,
      imagen: "/images/xbox/Metal gear solid Snake eater XBOX.png",
    },
    {
      id: 24,
      nombre: "The First Berserker: Khazan",
      descripcion: "XBOX Series X|S",
      precio: 42990,
      imagen: "/images/xbox/The first berserker Khazan XBOX.png",
    },
    {
      id: 46,
      nombre: "Super Mario Party Jamboree",
      descripcion: "Nintendo Switch 2",
      precio: 84990,
      imagen: "/images/nintendo/Super Mario party jamboree switch 2.png",
    },
    {
      id: 15,
      nombre: "Silent Hill 2",
      descripcion: "PS5",
      precio: 59990,
      imagen: "/images/play/Silent hill 2 PS5.png",
    },
    {
      id: 6,
      nombre: "Yakuza 0 Director's Cut",
      descripcion: "Nintendo Switch 2",
      precio: 65990,
      imagen: "/images/nintendo/Yakuza 0 directors cut switch 2.png",
    },
    {
      id: 49,
      nombre: "Final Fantasy VII Rebirth",
      descripcion: "PS5",
      precio: 67990,
      imagen: "/images/play/final fantasy VII rebirth PS5.png",
    },
    {
      id: 26,
      nombre: "Elden Ring: Nightreign",
      descripcion: "XBOX Series X|S",
      precio: 33990,
      imagen: "/images/xbox/Elden ring Nightreign XBOX.png",
    },
    {
      id: 44,
      nombre: "The Legend of Zelda: Tears of the Kingdom",
      descripcion: "Nintendo Switch 2",
      precio: 84990,
      imagen: "/images/nintendo/The legend of Zelda tears of the kingdom switch 2.png",
    },
    {
      id: 5,
      nombre: "The Last of Us Parte II",
      descripcion: "PS5",
      precio: 59990,
      imagen: "/images/play/The last of us part II PS5.png",
    },
  ];

  
  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carritoActual.find((item) => item.id === producto.id);

    if (existente) {
      existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
      carritoActual.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    window.dispatchEvent(new Event("carritoActualizado"));

    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 1500);
  };

  return (
    <main>
      <div className="contenedor">
        <div className="video-texto">
          <iframe
            src="https://www.youtube.com/embed/ajh3YHJ6baI"
            title="Trailer METAL GEAR SOLID Δ: SNAKE EATER"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p>
            El principio de todo. Una adaptación del juego METAL GEAR SOLID 3: SNAKE
            EATER de 2004, con la historia irresistible y el mundo fascinante que ya
            conoces, ahora con gráficos renovados y sonido 3D que potencian el
            ambiente selvático. Prepárate para la experiencia definitiva de
            supervivencia, sigilo y acción. La crisis en plena Guerra Fría con la que
            comenzó todo En plena Guerra Fría, Naked Snake, el hombre al que acabarían
            conociendo como Big Boss, se infiltra en la Unión Soviética para escoltar
            a un científico desertor, Sokolov. Sin embargo, la misión acaba siendo un
            fracaso cuando la mentora de Snake (The Boss, una soldado conocida como la
            madre de las fuerzas especiales) lo traiciona y Sokolov es capturado por
            el coronel Volgin del GRU. Una semana más tarde, Snake vuelve al
            territorio soviético para rescatar a Sokolov y eliminar a The Boss. Esta
            misión marcará el inicio de una nueva leyenda en el contexto de una
            historia marcada por constantes cambios Todo lo que te encanta y todavía
            más. Vuelven la historia, los personajes, el doblaje, la jugabilidad y la
            música que causaron un gran impacto en una nueva versión para las consolas
            de la actual generación. Este salto evolutivo otorga a cada escena una
            nueva vida y reconstruye cada rincón del mundo.
          </p>
        </div>
        <h2>
          <center>
            <strong>Productos destacados</strong>
          </center>
        </h2>

  {mensajeVisible && (
          <div className="mensaje-carrito">✅ Añadido al carrito</div>
        )}

        <div className="carousel-container">
          <div className="carousel" id="carousel-productos">
            {productos.map((producto) => (
              <div key={producto.id} className="juego">
                <img src={producto.imagen} alt={producto.nombre} />
                <div className="titulo">{producto.nombre}</div>
                <div className="descripcion">{producto.descripcion}</div>
                <div className="precio">
                  ${producto.precio.toLocaleString("es-CL")}
                </div>
                <button
                  className="boton agregar-carrito"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>

          <button
            className="carousel-btn prev"
            onClick={() => moverCarrusel(-1)}
          >
            ❮
          </button>
          <button
            className="carousel-btn next"
            onClick={() => moverCarrusel(1)}
          >
            ❯
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;