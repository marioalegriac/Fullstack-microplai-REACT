import React from 'react'

function Xbox() {
  const [mensajeVisible, setMensajeVisible] = React.useState(false);
  const [setMensajeTexto] = React.useState("");

  const juegos =[
    {
    id:19,
    nombre:"Metal Gear solid Snake eater",
    descripcion: "XBOX Series X|S",
    precio: 69990,
    imagen: "src/images/xbox/Metal gear solid Snake eater XBOX.png",
  },
  {
    id:20,
    nombre:"Halo infinite",
    descripcion: "XBOX Series X|S",
    precio: 59990,
    imagen: "src/images/xbox/Halo infinite XBOX.png",
  },
  {
    id:21,
    nombre: "Assassins creed shadow",
    descripcion: "XBOX Series X|S",
    precio: 54990,
    imagen: "src/images/xbox/Assassins creed shadow XBOX.png",
  },
  {
    id:22,
    nombre: "Back 4 blood",
    descripcion: "XBOX Series X|S",
    precio: 24990,
    imagen: "src/images/xbox/Back 4 blood XBOX.png",
  },
  {
    id:23,
    nombre: "Borderlands 4 ",
    descripcion: "XBOX Series X|S",
    precio: 64990,
    imagen: "src/images/xbox/Borderlands 4 XBOX.png",
  },
  {
    id:24,
    nombre: "The first berserker Khazan",
    descripcion: "XBOX Series X|S",
    precio: 42990,
    imagen: "src/images/xbox/The first berserker Khazan XBOX.png",
  },
  {
    id:25,
    nombre: "Crysis remastered trilogy",
    descripcion: "XBOX Series X|S",
    precio: 29990,
    imagen: "src/images/xbox/Crysis remastered trilogy XBOX.png",
  },
  {
    id:26,
    nombre: "Elden ring Nightreign",
    descripcion: "XBOX Series X|S",
    precio: 33990,
    imagen: "src/images/xbox/Elden ring Nightreign XBOX.png",
  },
  {
    id:27,
    nombre: "Elden ring",
    descripcion: "XBOX Series X|S",
    precio: 22990,
    imagen: "src/images/xbox/Elden ring XBOX.png",
  },
  {
    id:28,
    nombre: "Flight simulator",
    descripcion: "XBOX Series X|S",
    precio: 9990,
    imagen: "src/images/xbox/Flight simulator XBOX.png",
  },
  {
    id:29,
    nombre: "Forza horizon 5",
    descripcion: "XBOX Series X|S",
    precio: 26990,
    imagen: "src/images/xbox/Forza horizon 5 XBOX.png",
  },
  {
    id:30,
    nombre: "Hitman 3",
    descripcion: "XBOX Series X|S",
    precio: 14990,
    imagen: "src/images/xbox/Hitman 3 XBOX.png",
  },
  {
    id:31,
    nombre: "Mafia the old country",
    descripcion: "XBOX Series X|S",
    precio: 60990,
    imagen: "src/images/xbox/Mafia the old country XBOX.png",
  },
  {
    id:32,
    nombre: "Monster hunter wilds",
    descripcion: "XBOX Series X|S",
    precio: 31990,
    imagen: "src/images/xbox/Monster hunter wilds XBOX.png",
  },
  {
    id:33,
    nombre: "Persona 5",
    descripcion: "XBOX Series X|S",
    precio: 43990,
    imagen: "src/images/xbox/Peronsa 5 XBOX.png",
  },
  {
    id:34,
    nombre: "Tony hawks pro skater",
    descripcion: "XBOX Series X|S",
    precio: 22990,
    imagen: "src/images/xbox/Tony hawks pro skater XBOX.png",
  },
  {
    id:35,
    nombre: "Call of duty black ops 7",
    descripcion: "XBOX Series X|S",
    precio: 79990,
    imagen: "src/images/xbox/Call of duty black ops 7 XBOX.png",
  }
  ];


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

    // Mostrar mensaje flotante

    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 1500);
  };


  return (
    <div className="container">

      {mensajeVisible && (
        <div className="mensaje-carrito">
          ✅ Añadido al carrito
        </div>
      )}

   <h2><center><strong>XBOX</strong></center></h2>
  
  <div className="video-texto">
    <iframe
      src="https://www.youtube.com/embed/0tUqIHwHDEc"
        title="Presentacion Xbox series X"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
    <p>
      Xbox es la división de videojuegos de Microsoft, fundada en el año 2001 con el lanzamiento de su primera consola, 
		la Xbox original. Desde entonces, Xbox se ha consolidado como una de las principales marcas en la industria del gaming, 
		gracias a su enfoque en la potencia, el rendimiento y una experiencia de juego conectada. A lo largo de los años, 
		la marca ha ampliado su catálogo con franquicias icónicas como Halo, Gears of War y Forza Motorsport.
		Microsoft ha impulsado la innovación en Xbox con cada generación, integrando servicios como Xbox Live, Xbox Game Pass y 
		compatibilidad entre dispositivos, acercando a millones de jugadores a una comunidad global. Consolas como la Xbox 360 y 
		la Xbox One marcaron hitos importantes en la evolución del entretenimiento interactivo, combinando hardware potente con un ecosistema digital robusto.
		La Xbox Series X, la consola más reciente de la marca, representa un salto tecnológico significativo, con hardware de última generación 
		que ofrece gráficos en 4K nativos, tiempos de carga ultrarrápidos gracias a su SSD y una potencia de procesamiento capaz de ejecutar juegos con un 
		rendimiento fluido y realista. Además, la Series X mantiene la compatibilidad con miles de juegos de generaciones anteriores, reforzando el compromiso 
		de Microsoft con sus jugadores y el futuro del gaming.
    </p>
  </div>
      <h2 className="titulo-catalogo"><center>Catálogo Xbox</center></h2>

      <div className="catalogo">
        {juegos.map((juego) => (
          <div key={juego.id} className="juego">
            <img src={juego.imagen} alt={juego.nombre} />
            <div className="titulo">{juego.nombre}</div>
            <div className="descripcion">{juego.descripcion}</div>
            <div className="precio">{juego.precio === 0 ? "Gratis" : "$"}
              {juego.precio.toLocaleString("es-CL")}
            </div>

            <button
              className="boton agregar-carrito"
              onClick={() => { 
                agregarAlCarrito(juego, setMensajeTexto, setMensajeVisible); 
              }}
              
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Xbox;