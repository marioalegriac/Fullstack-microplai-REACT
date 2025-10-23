import React from 'react'

function Nintendo() {
  const [mensajeVisible, setMensajeVisible] = React.useState(false);
  const [setMensajeTexto] = React.useState("");

  const juegos =[
    {
    id:36,
    nombre: "Mario kart world ",
    descripcion: "Nintendo Switch 2",
    precio: 85990,
    imagen: "src/images/nintendo/Mario kart world switch 2.png",
  },
  {
    id:37,
    nombre: "Donkey Kong bananza",
    descripcion: "Nintendo Switch 2",
    precio: 75990,
    imagen: "src/images/nintendo/Donkey Kong bananza switch 2.png",
  },
  {
    id:38,
    nombre: "Daemon x machine",
    descripcion: "Nintendo Switch 2",
    precio: 58990,
    imagen: "src/images/nintendo/Donkey Kong bananza switch 2.png",
  },
  {
    id:39,
    nombre: "Kirby air riders",
    descripcion: "Nintendo Switch 2",
    precio: 82990,
    imagen: "src/images/nintendo/Kirby air riders switch 2.png",
  },
  {
    id:40,
    nombre: "Little nightmares 3",
    descripcion: "Nintendo Switch 2",
    precio: 73990,
    imagen: "src/images/nintendo/Little nightmares 3 switch 2.png",
  },
  {
    id:41,
    nombre: "Kirby and the forgottenland",
    descripcion: "Nintendo Switch 2",
    precio: 79990,
    imagen: "src/images/nintendo/Kirby and the forgottenland switch 2.png",
  },
  {
    id:42,
    nombre: "Pokemon legends",
    descripcion: "Nintendo Switch 2",
    precio: 74990,
    imagen: "src/images/nintendo/Pokemon legends switch 2.png",
  },
  {
    id:43,
    nombre: "Persona 3",
    descripcion: "Nintendo Switch 2",
    precio: 74990,
    imagen: "src/images/nintendo/Persona 3 switch 2.png",
  },
  {
    id:44,
    nombre: "The legend of Zelda breath of the wild",
    descripcion: "Nintendo Switch 2",
    precio: 79990,
    imagen: "src/images/nintendo/The legend of Zelda breath of the wild switch 2.png",
  },
  {
    id:45,
    nombre: "The legend of Zelda tears of the kingdom",
    descripcion: "Nintendo Switch 2",
    precio: 84990,
    imagen: "src/images/nintendo/The legend of Zelda tears of the kingdom switch 2.png",
  },
  {
    id:46,
    nombre: "Split fiction",
    descripcion: "Nintendo Switch 2",
    precio: 59990,
    imagen: "src/images/nintendo/Split fiction switch 2.png",
  },
  {
    id:47,
    nombre: "Super Mario party jamboree",
    descripcion: "Nintendo Switch 2",
    precio: 84990,
    imagen: "src/images/nintendo/Super Mario party jamboree switch 2.png",
  },
  {
    id:48,
    nombre: "Stars wars outlaws",
    descripcion: "Nintendo Switch 2",
    precio: 79990,
    imagen: "src/images/nintendo/Stars wars outlaws switch 2.png",
  },
  {
    id:49,
    nombre: "Street fighter 6",
    descripcion: "Nintendo Switch 2",
    precio: 62990,
    imagen: "src/images/nintendo/Street fighter 6 switch 2.png",
  },
  {
    id:50,
    nombre: "Yakuza 0 directors cut",
    descripcion: "Nintendo Switch 2",
    precio: 65990,
    imagen: "src/images/nintendo/Yakuza 0 directors cut switch 2.png",
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

  <h2><center><strong>NINTENDO</strong></center></h2>
  
  <div class="video-texto">
    <iframe 
        src="https://www.youtube.com/embed/0QeqO0kFz-E"
        title="Presentacion Nintendo switch 2"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
    <p>
      Nintendo es una de las compañías más icónicas y queridas en la historia de los videojuegos. Fundada en Japón en 1889 y 
		centrada en el entretenimiento electrónico desde los años 80, ha sido responsable de crear algunas de las franquicias más populares del mundo, 
		como Super Mario, The Legend of Zelda y Pokémon.
		A lo largo de las décadas, Nintendo ha destacado por su enfoque en la jugabilidad, la innovación y el entretenimiento para todas las edades. 
		Consolas como la NES, la Super Nintendo, la Nintendo 64 y la Wii marcaron generaciones. Con la llegada de la Nintendo Switch, 
		la compañía combinó el juego en casa con la portabilidad, ofreciendo una experiencia versátil y única que sigue siendo un éxito global.
		Con altas expectativas por parte de la comunidad, Nintendo se prepara para el lanzamiento de la Nintendo Switch 2, 
		una consola que busca mantener la esencia híbrida que hizo tan exitosa a su predecesora, pero con mejoras significativas en potencia gráfica, 
		rendimiento y nuevas funciones. Se espera que la Switch 2 ofrezca compatibilidad con juegos anteriores y continúe con el enfoque de experiencias accesibles,
		creativas y únicas que definen el sello Nintendo.
    </p>
  </div>
      <h2 className="titulo-catalogo"><center>Catálogo Nintendo</center></h2>

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


export default Nintendo