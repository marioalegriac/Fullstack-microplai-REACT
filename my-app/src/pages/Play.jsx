import React from 'react'
import { obtenerInfoJuego } from '../funciones/funciones';
import { agregarAlCarrito } from '../funciones/funciones';
import { Link } from "react-router-dom";

function Play() {
  const [mensajeVisible, setMensajeVisible] = React.useState(false);
  const [mensajeTexto, setMensajeTexto] = React.useState("");


  const juegos =[
    {
    id:1,
    nombre: "Metal Gear Solid V: The Phantom Pain ",
    descripcion: "PS5",
    precio: 74990,
    imagen: "/images/play/Metal gear solid Snake eater PS5.png",
  },
  {
    id:2,
    nombre: "God of war ragnarok ",
    descripcion: "PS5",
    precio: 67990,
    imagen: "/images/play/God of war ragnarok PS5.png",
  },
  {
    id:3,
    nombre: "Elden ring ",
    descripcion: "PS5",
    precio: 59990,
    imagen: "/images/play/Elden ring PS5.png",
  },
  {
    id:4,
    nombre: "The last of us part I ",
    descripcion: "PS5",
    precio: 69990,
    imagen: "/images/play/The last of us part I PS5.png",
  },
  {
    id:5,
    nombre: "The last of us part II ",
    descripcion: "PS5",
    precio: 59990,
    imagen: "/images/play/The last of us part II PS5.png",
  },
  {
    id:6,
    nombre: "Ghost of Tsushima PS5",
    descripcion: "PS5",
    precio: 34990,
    imagen: "/images/play/Ghost of Tsushima PS5.png",
  },
  {
    id:7,
    nombre: "Resident evil 4",
    descripcion: "PS5",
    precio: 39990,
    imagen: "/images/play/Resident evil 4 PS5.png",
  },
  {
    id:8,
    nombre: "Final fantasy VII",
    descripcion: "PS5",
    precio: 67990,
    imagen: "/images/play/Final fantasy VII PS5.png",
  },
  {
    id:9,
    nombre: "final fantasy VII rebirth",
    descripcion: "PS5",
    precio: 54990,
    imagen: "/images/play/final fantasy VII rebirth PS5.png",
  },
  {
    id:10,
    nombre: "Resident evil 2",
    descripcion: "PS5",
    precio: 35990,
    imagen: "/images/play/Resident evil 2 PS5.png",
  },
  {
    id:11,
    nombre: "Resident evil 3",
    descripcion: "PS5",
    precio: 39990,
    imagen: "/images/play/Resident evil 3 PS5.png",
  },
  {
    id:12,
    nombre: "Gran turismo 7",
    descripcion: "PS5",
    precio: 75990,
    imagen: "/images/play/Gran turismo 7 PS5.png",
  },
  {
    id:13,
    nombre: "Spider-man 2",
    descripcion: "PS5",
    precio: 39990,
    imagen: "/images/play/Spider-man 2 PS5.png",
  },
  {
    id:14,
    nombre: "Spider-man Miles Morales",
    descripcion: "PS5",
    precio: 34990,
    imagen: "/images/play/Spider-man Miles Morales PS5.png",
  },
  {
    id:15,
    nombre: "Silent hill 2",
    descripcion: "PS5",
    precio: 59990,
    imagen: "/images/play/Silent hill 2 PS5.png",
  },
  {
    id:16,
    nombre: "Resident evil 7 gold edition",
    descripcion: "PS5",
    precio: 32990,
    imagen: "/images/play/Resident evil 7 gold edition PS5.png",
  },
  {
    id:17,
    nombre: "Resident evil 8 village",
    descripcion: "PS5",
    precio: 34990,
    imagen: "/images/play/Resident evil 8 village PS5.png",
  },
  {
    id:18,
    nombre: "Demons souls",
    descripcion: "PS5",
    precio: 34990,
    imagen: "/images/play/Demons souls PS5.png",
  }
  ];
  

  
  

  return (
    <div className="container">

      {/* Mensaje flotante */}
      {mensajeVisible && (
        <div className="mensaje-carrito">
          {mensajeTexto}
        </div>
      )}

      <h2><center><strong>PLAYSTATION</strong></center></h2>

      <div className="video-texto">
        <iframe
          src="https://www.youtube.com/embed/RkC0l4iekYo"
          title="Presentacion PS5"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>
          El meo corte es una de las marcas más reconocidas y exitosas en el mundo de
          los videojuegos. Lanzada por Sony Interactive Entertainment en 1994,
          revolucionó la industria con su enfoque en gráficos avanzados,
          experiencias inmersivas y una amplia biblioteca de juegos exclusivos. A lo
          largo de los años, PlayStation ha establecido un legado con consolas que
          han marcado generaciones, ofreciendo entretenimiento para millones de
          jugadores alrededor del mundo. La marca se ha destacado por su innovación
          constante y su compromiso con la calidad, integrando nuevas tecnologías
          como realidad virtual, servicios online robustos y una comunidad global
          que sigue creciendo. Desde la PlayStation original hasta la PlayStation 4,
          Sony ha sabido combinar potencia, diseño y juegos que definen la cultura
          gamer. La PlayStation 5 representa el último avance en esta saga, con un
          hardware de última generación que ofrece gráficos en 4K, tiempos de carga
          ultrarrápidos gracias a su SSD personalizado y un nuevo control DualSense
          que mejora la inmersión con su respuesta háptica y gatillos adaptativos.
          Esta consola no solo potencia la experiencia de juego, sino que también
          sigue ampliando el ecosistema PlayStation con nuevas funcionalidades y
          exclusivos que emocionan a los fans.
        </p>
      </div>

      <h2 className="titulo-catalogo"><center>Catálogo PlayStation</center></h2>

      <div className="catalogo">
        {juegos.map((juego) => (
          <div key={juego.id} className="juego">
            <Link to={`/detalle/${juego.id}`}>
              <img src={juego.imagen} alt={juego.nombre} />
            </Link>
            <div className="titulo">{juego.nombre}</div>
            <div className="descripcion">{juego.descripcion}</div>
            <div className="precio">
              {juego.precio === 0 ? "Gratis" : "$"}
              {juego.precio.toLocaleString("es-CL")}
            </div>
            <button
              className="boton agregar-carrito"
              onClick={() =>
                agregarAlCarrito(juego, setMensajeTexto, setMensajeVisible)
              }
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Play;