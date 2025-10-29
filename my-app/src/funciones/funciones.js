import { supabase } from '../SupaBaseCliente';
import * as XLSX from "xlsx";

//funcion validar el formulario para contacto
export function valformulario(event) {
  event.preventDefault(); // evita que la página se recargue

  const email = document.getElementById('user_email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!email || !subject || !message) {
    alert("⚠️ Por favor, completa todos los campos.");
    return false;
  }

  alert("✅ Mensaje enviado correctamente.");
  return true;
}



// funcion del formateo del precio para el carrito para que se vea con los puntos y el clp
export function formatearPrecio(valor){
    return valor.toLocaleString("es-CL") + " CLP";
}



// FUNCION AGREGAR AL CARRITO
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".agregar-carrito");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();

            const nombre = boton.getAttribute("data-nombre");
            const precio = parseFloat(boton.getAttribute("data-precio"));
            const imagen = boton.getAttribute("data-imagen");

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            const index = carrito.findIndex(item => item.nombre === nombre);
            if (index !== -1) {
                carrito[index].cantidad += 1;
            } else {
                carrito.push({ nombre, precio, imagen, cantidad: 1 });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            const mensaje = document.getElementById("mensaje-flotante");
            mensaje.classList.add("visible");
            setTimeout(() => mensaje.classList.remove("visible"), 1500);
        });
    });
});


// FUNCION MOSTRAR EL CARRITO
export function actualizarCarritoReact(
  carrito,
  setCarrito,
  setMensajeVisible,
  setMensajeTexto,
  id = null,
  accion = null
) {
  let nuevoCarrito = [...carrito];

  if (accion && id !== null) {
    nuevoCarrito = nuevoCarrito.map(item => {
      if (item.id === id) {
        if (accion === "aumentar") return { ...item, cantidad: (item.cantidad || 1) + 1 };
        if (accion === "disminuir") return { ...item, cantidad: (item.cantidad || 1) - 1 };

      }
      return item;
    });

    if (accion === "disminuir") {

      nuevoCarrito = nuevoCarrito.filter(item => item.cantidad > 0);
    }

    if (accion === "eliminar") {
      nuevoCarrito = nuevoCarrito.filter(item => item.id !== id);
    }
  }

  setCarrito(nuevoCarrito);
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));


  if (nuevoCarrito.length === 0 && accion === "eliminar") {
    setMensajeTexto("🛒 Tu carrito está vacío");
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 2000);
  }

}


export function pagarCarritoReact(carrito, setCarrito, setMensajeVisible, setMensajeTexto) {
  if (!carrito || carrito.length === 0) {

    setMensajeTexto("❌ No se puede pagar, el carrito está vacío");
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000);
    return;
  }


  setCarrito([]);
  localStorage.removeItem("carrito");
  setMensajeTexto("✅ Compra realizada con éxito");
  setMensajeVisible(true);
  setTimeout(() => setMensajeVisible(false), 3000);
}


export function validarRegistro(setMensajeTexto, setMensajeVisible) {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errores = [];

        if (nombre.length > 100) {
            errores.push("El nombre no puede tener más de 100 caracteres.");
        }

        if (apellido.length > 100) {
            errores.push("El apellido no puede tener más de 100 caracteres.");
        }

        if (
            !(
                correo.endsWith('@duocuc.cl')||
                correo.endsWith('@profesor.duoc.cl')||
                correo.endsWith('@gmail.com')
            )
        ){
            errores.push("El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com");
        }

        if (password.length < 5 || password.length > 20) {
            errores.push("La contraseña debe tener entre 5 y 20 caracteres.");
        }

        if (!/[0-9]/.test(password)) {
            errores.push("La contraseña debe tener al menos un número.");
        }

        if (password !== confirmPassword) {
            errores.push("Las contraseñas no coinciden.");
        }

        const errorContainer = document.getElementById('errores');
        if (errores.length > 0) {
            errorContainer.innerHTML = errores.join('<br>');
        } else {
            errorContainer.innerHTML = "";
            setMensajeTexto("✅ Registro exitoso");
            setMensajeVisible(true);
            setTimeout(() => setMensajeVisible(false), 3000);
            document.getElementById('registerForm').reset();
        }
    }




// FUNCION DEL CARRUSEL
import emailjs from "@emailjs/browser";
export function moverCarrusel(direccion) {
        const carrusel = document.getElementById('carousel-productos');
        const anchoItem = carrusel.querySelector('.juego').offsetWidth + 240;
        carrusel.scrollBy({ left: direccion * anchoItem, behavior: 'smooth' });
    }

    document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("lWDqvGY4Fj9noKYtz");

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!valformulario()) return;

            const userEmail = contactForm.user_email.value;
            const subject = contactForm.subject.value;

            const templateParams = {
                userEmail: userEmail,
                subject: subject,
                message: `Hemos recibido su solicitud correctamente.
Nuestro equipo está revisando su caso y nos pondremos en contacto con usted a la brevedad.

Agradecemos su paciencia y quedamos atentos para asistirle en lo que necesite.

Saludos cordiales,
Microplai.`
            };

            emailjs.send("service_2wpcqd9", "template_nsebgim", templateParams)
                .then(() => {
                    alert("Correo enviado con éxito al usuario");
                    contactForm.reset();
                })
                .catch((error) => {
                    alert("Error al enviar: " + JSON.stringify(error));
                });
        });
    }
});

//DETALLE AGREGAR AL CARRITO
export const agregarAlCarrito = (producto, setMensajeTexto, setMensajeVisible) => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.id === producto.id);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  window.dispatchEvent(new Event("carritoActualizado"));

  // Mostrar mensaje flotante
  setMensajeTexto("✅ Añadido al carrito");
  setMensajeVisible(true);
  setTimeout(() => setMensajeVisible(false), 1500);
};


export function obtenerInfoJuego(id) {
    const juegos = [
        // JUEGOS PS5
        {
            id: 1,
            nombre: "Metal Gear Solid Snake Eater ",
            consola: "PS5",
            descripcion:"Descubre el origen del icónico agente militar Snake y empieza a desentrañar la trama de la legendaria saga Metal Gear. En secreto, naciones rivales desarrollan armas que podrían poner en peligro el futuro de la humanidad. En la profundidad de la selva, un soldado de élite debe combinar habilidades de sigilo y supervivencia para infiltrarse entre el enemigo e impedir que un arma de destrucción masiva desate la mayor guerra que el mundo haya visto.",
            video: "https://www.youtube.com/embed/ajh3YHJ6baI",
            precio: 74990,
            imagen: "public/images/play/Metal gear solid Snake eater PS5.png"
        },
        {
            id:2,
            nombre: "God of war ragnarok ",
            consola: "PS5",
            descripcion:"Acompaña a Kratos y Atreus en su lucha contra los dioses nórdicos en una épica secuela llena de acción y emociones. Embárcate en un épico y cordial viaje mientras Kratos y Atreus luchan por aferrarse y soltar. Desde Santa Monica Studio llega la secuela del aclamado por la crítica God of War (2018). Fimbulvetr ya está en camino. Kratos y Atreus deben viajar a cada uno de los nueve reinos en búsqueda de respuestas, mientras que las fuerzas asgardianas se preparan para una batalla profetizada que terminará con el mundo. En el camino explorarán paisajes increíbles y míticos, y se enfrentarán a aterradores enemigos en la forma de dioses nórdicos y monstruos. La amenaza del Ragnarök cada vez está más cerca. Kratos y Atreus deben elegir entre su propia seguridad y la seguridad de los reinos.",
            video: "https://www.youtube.com/embed/vtFhDrMIZjE",
            precio: 67990,
            imagen: "public/images/play/God of war ragnarok PS5.png"
        },
        {
            id:3,
            nombre: "Elden ring ",
            consola: "PS5",
            descripcion:"Blande el poder del Anillo Elden y conviértete en un Señor Elden en las Tierras Intermedias. La Orden Dorada ha sido destruida. En las Tierras Intermedias, gobernadas por la Reina Marika la Eterna, el Anillo de Elden, la fuente del Árbol de la Muerte, ha sido destrozado. Los descendientes de Marika, todos semidioses, reclamaron los fragmentos del Anillo de Elden, conocidos como las Grandes Runas, y la demencial mancha de su recién descubierta fuerza desencadenó una guerra: La Fragmentación. Una guerra que significó el abandono de la Voluntad Mayor. Y ahora la guía de la gracia llegará a los Mancillados, quienes fueron rechazados por la gracia del oro y exiliados de las Tierras Intermedias.",
            video: "https://www.youtube.com/embed/AKXiKBnzpBQ",
            precio: 59990,
            imagen: "public/images/play/Elden ring PS5.png"
        },
        {
            id:4,
            nombre: "The last of us part ",
            consola: "PS5",
            descripcion:"Resiste y sobrevive. Revive el amado juego que lo comenzó todo, reconstruido para la consola PlayStation®5. En una civilización devastada, donde los infectados y los empedernidos sobrevivientes proliferan, Joel, un protagonista cansado, es contratado para rescatar de contrabando a una niña de 14 años llamada Ellie de una zona de cuarentena militar. Sin embargo, lo que comienza como un pequeño trabajo pronto se transforma en una brutal travesía por todo el país.",
            video: "https://www.youtube.com/embed/WxjeV10H1F0",
            precio: 69990,
            imagen: "public/images/play/The last of us part I PS5.png"
        },

        {
            id:5,
            nombre:"The last of us part II ",
            consola: "PS5",
            descripcion:"VIVE LOS CONMOVEDORES VIAJES DE ELLIE Y ABBY EN ESTA REMASTERIZACIÓN PARA PS5. Cinco años después de su peligroso viaje a través de unos Estados Unidos pospandemia, Ellie y Joel logran establecerse en Jackson, Wyoming. Vivir entre una próspera comunidad de sobrevivientes les ha concedido paz y estabilidad, a pesar de la amenaza constante de los infectados y de otros sobrevivientes más desesperados. Cuando un evento violento interrumpe esa paz, Ellie se embarca en un viaje incesante para obtener justicia y llegar a un cierre.",
            video: "https://www.youtube.com/embed/JdE9U9WW_HM",
            precio: 59990,
            imagen: "public/images/play/The last of us part II PS5.png",
            
        },

        {
            id:6,
            nombre:"Ghost of Tsushima ",
            consola: "PS5",
            descripcion:"Se avecina una tormenta. Descubre la experiencia expandida de Ghost of Tsushima en la Versión del Director. Forja un nuevo camino y emplea tácticas de guerra poco convencionales para liberar Tsushima. Desafía a tus enemigos con tu katana, domina el arco para eliminar las amenazas lejanas, aprende tácticas de sigilo para emboscar a los enemigos y explora una nueva historia en la Isla Iki.",
            video: "https://www.youtube.com/embed/A5gVt028Hww",
            precio: 34990,
            imagen: "public/images/play/Ghost of Tsushima PS5.png"
        },

        {
            id:7,
            nombre:"Resident evil 4 ",
            consola: "PS5",
            descripcion:"Una emocionante reinterpretación del revolucionario clásico de terror y acción de Capcom. Seis años después de los eventos de Resident Evil 2, el sobreviviente de Raccoon City, Leon Kennedy, se encuentra apostado en un recóndito pueblo de Europa para investigar la desaparición de la hija del presidente de los Estados Unidos. Lo que descubre allí no se parece a nada que haya enfrentado antes. Todos los aspectos del juego clásico se han actualizado para la generación actual, desde gráficos y controles modernizados, hasta una historia reinventada que puede sorprender incluso a los fanáticos del juego original.",
            video: "https://www.youtube.com/embed/O75Ip4o1bs8",
            precio: 39990,
            imagen: "public/images/play/Resident evil 4 PS5.png"
        },

        {
            id:8,
            nombre:"Final fantasy VII ",
            consola: "PS5",
            descripcion:"FINAL FANTASY VII REMAKE INTERGRADE es una versión mejorada y expandida del título galardonado y aclamado por la crítica FINAL FANTASY VII REMAKE para PlayStation 5. FINAL FANTASY VII REMAKE INTERGRADE viene en un paquete con FF7R EPISODE INTERmission con Yuffie como personaje principal que introduce un nuevo y excitante arco argumental, y varias adiciones al juego para disfrute de los jugadores.",
            video: "https://www.youtube.com/embed/Ge73iBqc7o8",
            precio: 67990,
            imagen: "public/images/play/Final fantasy VII PS5.png"
        },
        

        {
            id:9,
            nombre:"final fantasy VII rebirth ",
            consola: "PS5",
            descripcion:"Descubre un vasto mundo brillante en esta entrega independiente dentro del proyecto de remake de Final Fantasy VII. .Final Fantasy VII Rebirth es la segunda entrega dentro del proyecto de remake de Final Fantasy VII, que vuelve a contar la historia del RPG que redefinió el género en tres juegos distintos. Los héroes icónicos Cloud, Barret, Tifa, Aeris y Red XIII han escapado de la distópica ciudad de Midgar y ahora están en busca de Sefirot, el vengativo espadachín del pasado de Cloud a quien se creía muerto. Todos los jugadores pueden disfrutar esta nueva aventura, incluso quienes aún no hayan jugado Final Fantasy VII Remake o el original de PlayStation. Prepárate para deslumbrarte con un mayor nivel de narración cinemática, un combate con mucha acción y la posibilidad de explorar este vasto mundo.",
            video: "https://www.youtube.com/embed/ySktL_lzdCk",
            precio: 54990,
            imagen: "public/images/play/final fantasy VII rebirth PS5.png"
        },
        

        {
            id:10,
            nombre:"Resident evil 2 ",
            consola: "PS5",
            descripcion:"¿Qué es Resident Evil? Probablemente el género 'horror de supervivencia' no sería tan popular en la actualidad sin Resident Evil. En 1996, Capcom invitó a los jugadores de PlayStation a una mansión laberíntica repleta de zombis caníbales, zombis caninos que rompen ventanas y una variedad de armas bioorgánicas (A.B.O.) que ayudó a que el género 'horror de supervivencia' esté en la mente del público general. Resident Evil combinó el miedo, la acción, la exploración y el manejo de recursos de una manera innovadora que revolucionó un género poco valorado hasta ese momento. El primer juego fue un fenómeno instantáneo, y desde entonces ha dado lugar a numerosas secuelas y spin-offs, así como incursiones en el cine, los cómics y la animación",
            video: "https://www.youtube.com/embed/a-lEnz5QKuM",
            precio: 35990,
            imagen: "public/images/play/Resident evil 2 PS5.png"
        },
        

        {
            id:11,
            nombre:"Resident evil 3 ",
            consola: "PS5",
            descripcion:"Sé testigo de la caída de Raccoon City. Revive la terrorífica caída de Raccoon City en una impresionante versión alternativa del clásico de terror y supervivencia de 1999. En las horas de pesadilla previas y posteriores a los eventos de Resident Evil 2, solo tú puedes ayudar a la oficial de S.T.A.R.S. Jill Valentine a sobrevivir y escapar de una ciudad asolada por el brote de un virus espeluznante. Pero los zombis no son la única amenaza ahí fuera. Nemesis T-type, la imponente y casi indestructible arma biológica, también está a la caza. Esta monstruosidad brutal utiliza un arsenal de armas de gran potencia para perseguirte sin descanso por Raccoon City; ningún lugar es realmente seguro. Gracias a una presentación de vanguardia y una jugabilidad de acción y aventura renovada, Resident Evil 3 actualiza el inolvidable final de la historia de Raccoon City de un modo explosivo.",
            video: "https://www.youtube.com/embed/BBky2uCGqtM",
            precio: 39990,
            imagen: "public/images/play/Resident evil 3 PS5.png"
        },
        

        {
            id:12,
            nombre:"Gran turismo 7 ",
            consola: "PS5",
            descripcion:"Gran Turismo 7 combina las mejores funciones del simulador de conducción real. Si eres piloto competitivo o casual, coleccionista, aficionado a las modificaciones, diseñador de apariencias o fotógrafo, encuentra tu camino con una colección impresionante de modos de juego, incluidos los favoritos de los fanáticos, como Campaña de GT, Arcade y Escuela de manejo. Gracias a la reincorporación del legendario modo Simulación de GT, puedes comprar autos, modificarlos y correr con ellos en campañas individuales, a medida que desbloqueas nuevos autos y desafíos. Y si te gusta enfrentarte cabeza a cabeza con otros, perfecciona tus habilidades y compite en el modo Sport. Con más de 420 autos disponibles en Brand Central y la concesionaria de autos usados desde el primer día, Gran Turismo 7 recrea la apariencia y el manejo de vehículos clásicos y superautos vanguardistas con un nivel de detalle sin precedentes. Cada auto tiene una sensación de conducción diferente y única en más de 90 pistas en diferentes condiciones climáticas, incluidas las pistas clásicas de la historia de GT. ",
            video: "https://www.youtube.com/embed/oz-O74SmTSQ",
            precio: 75990,
            imagen: "public/images/play/Gran turismo 7 PS5.png"
        },
        

        {
            id:13,
            nombre:"Spider-man 2 ",
            consola: "PS5",
            descripcion:"SER MEJORES. JUNTOS. Los Spider-Men Peter Parker y Miles Morales regresan para una nueva y emocionante aventura de la aclamada franquicia Marvel's Spider-Man para PS5. Balancéate, salta y utiliza las nuevas alas de telaraña para recorrer toda la ciudad de Nueva York de Marvel. También podrás cambiar rápidamente entre Peter Parker y Miles Morales para vivir diferentes historias y canalizar poderes nuevos y épicos, mientras el emblemático villano Venom amenaza con destruir sus vidas, la ciudad y a todos sus seres queridos.",
            video: "https://www.youtube.com/embed/YeMRixqvjog",
            precio: 39990,
            imagen: "public/images/play/Spider-man 2 PS5.png"
        },
        

        {
            id:14,
            nombre:"Spider-man Miles Morales ",
            consola: "PS5",
            descripcion:"Experimenta el ascenso de Miles Morales y sé testigo de cómo el nuevo héroe domina nuevos poderes increíbles y explosivos para convertirse en su propia versión de Spider-Man. En la última aventura del universo de Spider-Man de Marvel, el adolescente Miles Morales intenta ajustarse a su nuevo hogar mientras que sigue los pasos de su mentor, Peter Parker, para convertirse en el nuevo Spider-Man. Pero cuando un feroz enfrentamiento por el poder amenaza con destruir su hogar, el aspirante a héroe entiende que un gran poder conlleva una gran responsabilidad. Para salvar a la Nueva York de Marvel, Miles debe adoptar el manto de Spider-Man y volverlo propio.",
            video: "https://www.youtube.com/embed/3wHL2VIaFcs",
            precio: 34990,
            imagen: "public/images/play/Spider-man Miles Morales PS5.png",
        },
        

        {
            id:15,
            nombre:"Silent hill 2 ",
            consola: "PS5",
            descripcion:"Explora Silent Hill en busca de la esposa fallecida de James en este juego de terror psicológico renovado. Experimenta una obra maestra del terror psicológico, considerado como el mejor juego de la saga, en el hardware más avanzado con elementos visuales y sonidos viscerales. Ponte en el papel de James Sunderland y adéntrate en el pueblo abandonado de Silent Hill en este anticipado remake del clásico de 2001. Atraído a este misterioso lugar por una carta de su esposa, que murió tres años atrás, James se dirige al pueblo en busca de cualquier rastro de su esposa. Entra en un mundo irreal donde encontrarás monstruos retorcidos, el amenazante Pyramid Head y un reparto de personajes aparentemente normales que luchan con su pasado. Mientras James acepta su propio caos, una pregunta persistirá: ¿por qué vino a Silent Hill en realidad?",
            video: "https://www.youtube.com/embed/7f5qac5f3mE",
            precio: 59990,
            imagen: "public/images/play/Silent hill 2 PS5.png"
        },
        

        {
            id:16,
            nombre:"Resident evil 7 gold edition ",
            consola: "PS5",
            descripcion:"El miedo regresa al hogar. El peligro y la soledad emanan de las decrépitas paredes de una granja abandonada en el sur de los EE.UU. Resident Evil 7 marca un nuevo inicio para el género del survival horror, con un cambio total de modelo con la aterradora e inmersiva perspectiva de jugador vista aislada. Con el revolucionario RE Engine, el terror llega a nuevas cotas, con un fotorrealismo tan impactante que no podrás apartar los ojos. Entra en un espeluznante nuevo mundo de terror y sobrevive",
            video: "https://www.youtube.com/embed/V_Hbr9ITvc0",
            precio: 32990,
            imagen: "public/images/play/Resident evil 7 gold edition PS5.png"
        },
        

        {
            id:17,
            nombre:"Resident evil 8 village ",
            consola: "PS5",
            descripcion:"El miedo te rodea. Vive el horror de supervivencia como nunca antes en el octavo episodio principal de la historiada saga de Resident Evil. Ambientado unos pocos años después de los eventos horribles del Resident Evil 7: Biohazard, aclamado por la crítica, la nueva historia comienza con Ethan Winters y su esposa Mia viviendo tranquilamente en una nueva ubicación, libres de sus pesadillas pasadas. Justo cuando están construyendo su nueva vida juntos, la tragedia les cae encima de nuevo.",
            video: "https://www.youtube.com/embed/ztj8fv6Ttp8",
            precio: 34990,
            imagen: "public/images/play/Resident evil 8 village PS5.png"
        },

        {
            id:18,
            nombre:"Demons souls ",
            consola: "PS5",
            descripcion:"Completamente rediseñada, esta nueva versión te invita a experimentar una inquietante historia y el combate despiadado de Demon’s Souls™. De PlayStation Studios y Bluepoint Games llega un remake del clásico de PlayStation Demon's Souls. Completamente reconstruido desde cero y mejorado con maestría, este remake presenta los horrores de una tierra de fantasía oscura saturada de niebla a toda una nueva generación de jugadores. Aquellos que enfrentaron sus pruebas y tribulaciones antes, pueden una vez más desafiar a la oscuridad en calidad visual impresionante con desempeño increíble. En su búsqueda de poder, el 12.º rey de Boletaria, el rey Allant canalizó las antiguas artes del arma, despertando a un demonio desde los albores del tiempo mismo, el Antiguo. Con la invocación del Antiguo, una niebla sin color barrió por la tierra, desatando criaturas pesadillescas con hambre de almas humanas. Aquellos a los que les arrancaron las almas perdieron el juicio, y solo les quedó el deseo de atacar a los cuerdos restantes. Ahora, Boletaria queda marginada del mundo exterior y a los caballeros que se atreven a adentrarse en la densa niebla para liberar a la tierra de su aprieto, no los ven nunca más. Como guerrero solitario que desafió a la perniciosa niebla, debes enfrentar el desafío más duro para ganarte el título 'Matademonios' y enviar al Antiguo de vuelta a su letargo.",
            video: "https://www.youtube.com/embed/JiqGi3GMTko",
            precio: 34990,
            imagen: "public/images/play/Demons souls PS5.png"
        },
        // JUEGOS PS5


        //JUEGOS XBOX SERIES X|S
        {
            id:19,
            nombre:"Metal Gear solid Snake eater ",
            consola:"XBOX SERIES X|S",
            descripcion:"El principio de todo. Una adaptación del juego METAL GEAR SOLID 3: SNAKE EATER de 2004, con la historia irresistible y el mundo fascinante que ya conoces, ahora con gráficos renovados y sonido 3D que potencian el ambiente selvático. Prepárate para la experiencia definitiva de supervivencia, sigilo y acción. Todo lo que te encanta y todavía más. Vuelven la historia, los personajes, el doblaje, la jugabilidad y la música que causaron un gran impacto en una nueva versión para las consolas de la actual generación. Este salto evolutivo otorga a cada escena una nueva vida y reconstruye cada rincón del mundo. Auténticas representaciones de la vida real. Se ha mejorado el sistema de daños en combate con el desgaste de la ropa de Snake, así como los moratones y las heridas de bala de su cuerpo, todo reflejado en tiempo real. Cualquier lesión que sufra dejará una huella permanente en el cuerpo de Snake, lo que supone una aventura única para cada jugador.",
            video: "https://www.youtube.com/embed/ajh3YHJ6baI",
            precio: 69990,
            imagen: "public/images/xbox/Metal gear solid Snake eater XBOX.png"
            
        },
        

        {
            id:20,
            nombre:"Halo infinite ",
            consola:"XBOX SERIES X|S",
            descripcion:"¡Disfruta del célebre modo multijugador de Halo, reinventado y gratuito! Con más de 70 mapas para emparejamiento, miles de millones de configuraciones de personalización e innumerables creaciones de de la Fundición diseñadas por la comunidad, Halo Infinite cuenta con la plataforma multijugador más amplia de la franquicia hasta la fecha. Disfruta de una variedad de experiencias de juego sin precedentes, como frenéticos modos clasificatorios, exorbitantes partidas personalizadas, y hasta un modo cooperativo de supervivencia basado en oleadas, Tiroteo: Rey de la colina. Halo Infinite cuenta con opciones para satisfacer las preferencias y el estilo de juego de cualquier jugador, ¡ponte tu armadura y reúne a tu escuadrón!",
            video: "https://www.youtube.com/embed/PyMlV5_HRWk",
            precio: 59990,
            imagen: "public/images/xbox/Halo infinite XBOX.png"
        },
        

        {
            id:21,
            nombre:"Assassins creed shadow ",
            consola:"XBOX SERIES X|S",
            descripcion:"DOMINA LOS MECANISMOS DE SIGILO MÁS INTENSOS DE LA SAGA Y LUCHA EN COMBATES VISCERALES. 'Shadows es uno de los juegos de sigilo más divertidos de la década.' Juega como Naoe, una shinobi de mente rápida, y sírvete de la luz, el sonido y las sombras para evitar que te detecten. Infíltrate en fortalezas enemigas con numerosas opciones de parkour, como el nuevo gancho; distrae a los guardias con shuriken o bombas de humo, y asesina a tus objetivos con tu hoja oculta. En la piel del samurái Yasuke, realiza eliminaciones silenciosas con el arco o desata devastadores combos cuerpo a cuerpo con tu katana o naginata. SUMÉRGETE EN EL CAUTIVADOR MUNDO DE ASSASSIN'S CREED SHADOWS. 'Assassins Creed Shadows crea una de las mejores versiones del estilo de mundo abierto'.¡Adéntrate en el Japón feudal como nunca antes! Desde majestuosas ciudadelas hasta serenos santuarios y amplios paisajes rurales, Assassin's Creed Shadows ofrece un mundo abierto sobrecogedor donde las estaciones dinámicas, el clima cambiante y la destrucción del entorno afectan a tu enfoque táctico. Y si quieres que la inmersión sea total, disfruta del juego con las voces en japonés.",
            video: "https://www.youtube.com/embed/jx8WN9fY22M",
            precio: 54990,
            imagen: "public/images/xbox/Assassins creed shadow XBOX.png",
        },
        

        {
            id:22,
            nombre:"Back 4 blood ",
            consola:"XBOX SERIES X|S",
            descripcion:"Back 4 Blood es un emocionante juego de disparos en primera persona cooperativo, de los creadores de la aclamada franquicia de Left 4 Dead. Te encuentras en el centro de una guerra contra los infectados. Estos seres, que alguna vez fueron humanos, son huéspedes de un parásito letal que los convierte en criaturas determinadas a devorar lo que queda de la civilización. Con la inminente extinción de la humanidad, depende de ti y tus amigos llevar la lucha al enemigo, erradicar a los infectados y recuperar el mundo. Campaña cooperativa. Ábrete camino en un dinámico y peligroso mundo, en una campaña de historia cooperativa para 4 jugadores en la que debes trabajar en equipo para sobrevivir a las misiones cada vez más difíciles. Juega hasta con 3 de tus amigos en línea o en modo individual y guía a tu equipo en la batalla. Elige de entre 8 limpiadores personalizables a uno de los sobrevivientes inmunes y una selección de armas y objetos letales. Crea una estrategia para luchar contra un enemigo en evolución constante que está resuelto a destruirte.",
            video: "https://www.youtube.com/embed/5V9t5JAoMpw",
            precio: 24990,
            imagen: "public/images/xbox/Back 4 blood XBOX.png",
        },
        

        {
            id:23,
            nombre:"Borderlands 4 ",
            consola:"XBOX SERIES X|S",
            descripcion:"Borderlands 4 ofrece acción intensa, cazabóvedas y miles de millones de armas salvajes y mortíferas a un nuevo planeta gobernado por un despiadado tirano. Entra a Kairos como uno de los cuatro nuevos cazabóvedas en busca de riqueza y gloria. Usa poderosas habilidades de acción, personaliza tu equipo con extensos árboles de habilidades y domina a tus enemigos con dinámicas habilidades de movimiento. Libérate del opresor Cronometrador, un dictador despiadado que domina a las masas desde las alturas. Ahora, una catástrofe mundial amenaza su perfecto Orden y desata el Caos en todo el planeta. ¡SÉ IMBATIBLE!. Conviértete en una fuerza imparable de la batalla, arrasando enemigos con un arsenal totalmente nuevo de armas escandalosas. Muévete por Borderlands como nunca antes: realiza dobles saltos, deslízate, esquiva, forcejea y mucho más, atacando desde todas las direcciones. Impacta en cada encuentro con devastadoras habilidades de acción que desatan las habilidades únicas de tu cazabóvedas. Construye tu personaje perfecto con árboles de habilidades ramificados y una profunda y gratificante búsqueda de botín repleta de armas feroces y poderosos equipos.",
            video: "https://www.youtube.com/embed/KjDta63TM_U",
            precio: 24990,
            imagen: "public/images/xbox/Back 4 blood XBOX.png",
        },
        

        {
            id:24,
            nombre:"The first berserker Khazan ",
            consola:"XBOX SERIES X|S",
            descripcion:"Vive la brutal acción de The First Berserker: Khazan, un épico RPG de acción hardcore ambientado 800 años antes de los acontecimientos del universo de Dungeon Fighter Online (DNF). Adéntrate en las vastas tierras del continente de Arad y descubre la historia jamás contada del gran general Khazan. Domina un sistema de combate profundo e inmersivo mientras enfrentas a enemigos implacables y jefes colosales en intensas batallas estratégicas. ¿Podrás convertirte en el primer berserker y recorrer el sendero de la venganza de Khazan? [Frenesí de berserker]. Desbloquea habilidades exclusivas usando puntos de habilidad, libera el instinto de berserker que habita en lo más profundo de Khazan y arrasa el campo de batalla. Lleva tu frenesí al siguiente nivel. Reajusta las habilidades en cualquier momento y lugar. Prueba distintas combinaciones y enfréntate a intensas batallas contra jefes mientras descubres la mejor forma de maximizar tu poder y tu capacidad de supervivencia. [Enfrenta la muerte / General forjado en batalla]. No te entregues a la muerte. Para Khazan, la derrota no es el fin, sino parte del camino hacia un poder aún mayor. Recoge el Lacrima perdido en el lugar donde fuiste vencido y reclama la experiencia forjada en batalla. Levántate y retoma el camino de la venganza. No importa qué tan duros sean los desafíos que enfrentes… jamás te detengas.",
            video: "https://www.youtube.com/embed/BB25RcC05wc",
            precio: 42990,
            imagen: "public/images/xbox/The first berserker Khazan XBOX.png"
        },
        

        {
            id:25,
            nombre:"Crysis remastered trilogy ",
            consola:"XBOX SERIES X|S",
            descripcion:"Crysis Remastered: Lo que comienza como una simple misión de rescate se transforma en un campo de batalla cuando los invasores alienígenas invaden un archipiélago norcoreano. Jugando como un supersoldado Nómada, estás armado con un potente nanotraje equipado con Velocidad, Fuerza, Armadura y habilidades de Camuflaje. Usa un vasto arsenal de armas modulares y adapta tus tácticas y tu equipo para dominar a los enemigos en un enorme mundo abierto. Crysis 2 Remastered: Lo alienígenas han vuelto a un mundo arrasado por desastres climáticos. Mientras los invasores devastan Nueva York y empiezan un asalto que amenaza la aniquilación absoluta de la humanidad, solo tú tienes la tecnología para dirigir el contraataque. Equipado con el nanotraje actualizado 2.0, personaliza tu traje y tus armas en tiempo real y desbloquea poderosas habilidades nuevas en la batalla por la supervivencia de la humanidad. Crysis 3 Remastered: Volviendo al combate como un supersoldado Profeta, continúa la búsqueda de los alienígenas Alfa Céfalo, pero ahora también tienes que sacar a la luz la verdad sobre la corporación C.E.L.L., que ha convertido Nueva York en una floreciente selva urbana protegida por una nanocúpula gigante. Combate por siete distritos diferentes y diezma a tus oponentes en una descarga de fuerza bruta usando la tecnología superior del nanotraje, o usa el sigilo para alcanzar tus objetivos y convertirte en el silencioso salvador de la humanidad. Equipado con tu nuevo, potente y mortal Arco de depredador, no hay un camino equivocado para salvar al mundo.",
            video: "https://www.youtube.com/embed/_b0csk7IdJw",
            precio: 29990,
            imagen: "public/images/xbox/Crysis remastered trilogy XBOX.png"
        },
        

        {
            id:26,
            nombre:"Elden ring Nightreign ",
            consola:"XBOX SERIES X|S",
            descripcion:"ELDEN RING NIGHTREIGN es una aventura independiente dentro del universo de ELDEN RING que se creó reimaginando el diseño central del juego para ofrecer a los jugadores una nueva experiencia de juego. ASCIENDAN JUNTOS. Une fuerzas con otros jugadores para enfrentar la noche acechante y sus peligros en un modo cooperativo de 3 jugadores. LUCHA CON HEROÍSMO. Controla a héroes con destrezas únicas: cada uno posee sus propias habilidades y un estilo distintivo. Aunque son formidables por separado, sus habilidades crean sinergias poderosas cuando forman equipo. ENFRÉNTATE A LA NOCHE. Supera una implacable amenaza ambiental que altera el terreno entre cada sesión de juego y derrota al imponente jefe de esa noche.",
            video: "https://www.youtube.com/embed/W5ngfwwodZI",
            precio: 33990,
            imagen: "public/images/xbox/Elden ring Nightreign XBOX.png"
        },
        

        {
            id:27,
            nombre:"Elden ring ",
            consola:"XBOX SERIES X|S",
            descripcion:"Blande el poder del Anillo Elden y conviértete en un Señor Elden en las Tierras Intermedias. La Orden Dorada ha sido destruida. En las Tierras Intermedias, gobernadas por la Reina Marika la Eterna, el Anillo de Elden, la fuente del Árbol de la Muerte, ha sido destrozado. Los descendientes de Marika, todos semidioses, reclamaron los fragmentos del Anillo de Elden, conocidos como las Grandes Runas, y la demencial mancha de su recién descubierta fuerza desencadenó una guerra: La Fragmentación. Una guerra que significó el abandono de la Voluntad Mayor. Y ahora la guía de la gracia llegará a los Mancillados, quienes fueron rechazados por la gracia del oro y exiliados de las Tierras Intermedias.",
            video: "https://www.youtube.com/embed/PLo-TYCt1RY",
            precio: 22990,
            imagen: "public/images/xbox/Elden ring XBOX.png"
        },
        

        {
            id:28,
            nombre:"Flight simulator ",
            consola:"XBOX SERIES X|S",
            descripcion:"Microsoft Flight Simulator constituye la próxima generación de una de las series de simulación más queridas. Desde aviones ligeros hasta aviones a reacción de fuselaje ancho, podrás pilotar impresionantes aeronaves muy detalladas en un mundo increíblemente realista. Crea tu propio plan de vuelo y visita cualquier rincón del planeta. Disfruta volando de día o de noche y supera condiciones meteorológicas realistas y desafiantes.",
            video: "https://www.youtube.com/embed/p3xp-SnZDoY",
            precio: 9990,
            imagen: "public/images/xbox/Flight simulator XBOX.png"
        },
        

        {
            id:29,
            nombre:"Forza horizon 5 ",
            consola:"XBOX SERIES X|S",
            descripcion:"¡Tu aventura definitiva en Horizon te espera! Explora los coloridos paisajes del mundo abierto de México con una acción de conducción ilimitada y divertida en los mejores autos del mundo.",
            video: "https://www.youtube.com/embed/Rv7xLt5yNsM",
            precio: 26990,
            imagen: "public/images/xbox/Forza horizon 5 XBOX.png"
        },
        

        {
            id:30,
            nombre:"Hitman 3 ",
            consola:"XBOX SERIES X|S",
            descripcion:"Entra en el mundo del asesino definitivo. CONVIÉRTETE EN EL AGENTE 47. Vístete para la ocasión con este thriller de espías en el que tendrás que usar habilidades letales en más de 20 ubicaciones. LIBERTAD DE ACCIÓN. Tu arma más peligrosa es la creatividad. Desbloquea equipamiento nuevo y sube de nivel con misiones de lo más rejugables. EL MUNDO DEL ASESINATO. Recorre un mundo vivo y repleto de personajes intrigantes y oportunidades letales.",
            video: "https://www.youtube.com/embed/P2R6fSv6wE0",
            precio: 14990,
            imagen: "public/images/xbox/Hitman 3 XBOX.png"
        },
        

        {
            id:31,
            nombre:"Mafia the old country ",
            consola:"XBOX SERIES X|S",
            descripcion:"Descubre los orígenes del crimen organizado en Mafia: The Old Country, una cruda historia de mafias ambientada en el brutal submundo de la Sicilia del siglo XX. Lucha por sobrevivir como Enzo Favara y demuestra tu valía a la Familia en esta inmersiva aventura de acción en tercera persona, ambientada en una época peligrosa e implacable. Enzo hará lo que sea por tener una vida mejor. Después de una infancia brutal de trabajos forzados, está dispuesto a arriesgarlo todo para convertirse en un hombre de honor en la familia criminal Torrisi. Su juramento a la mafia, con todo el poder, la tentación y las dificultades que conlleva, es un ardiente recordatorio de esta simple verdad: la familia requiere sacrificio. Esta emocionante narrativa cobra vida gracias a sus impresionantes efectos visuales, una narrativa cinematográfica y el auténtico realismo que caracteriza a la aclamada serie Mafia. La historia de Enzo se desarrolla en una época en la que tener habilidad con el estilete era un recurso mortal, una escopeta recortada lupara era el arma de todos los días, las venganzas con sangre se cobraron por décadas y los mafiosos patrullaban sus redes de protección a pie, a caballo o al volante de automóviles de principios del siglo XX",
            video: "https://www.youtube.com/embed/2ICpPsP93NE",
            precio: 60990,
            imagen: "public/images/xbox/Mafia the old country XBOX.png"
        },

        {
            id:32,
            nombre:"Monster hunter wilds ",
            consola:"XBOX SERIES X|S",
            descripcion:"La desenfrenada fuerza de la naturaleza es libre e implacable, con entornos que cambian drásticamente de un instante a otro. Esta es una historia sobre monstruos y humanos, y su lucha por sobrevivir en armonía en un mundo de dualidad. Cumple con tu deber como cazador rastreando y derrotando poderosos monstruos; además, forja nuevas y poderosas armas y armaduras con los materiales que recolectes de tus cacerías, mientras descubres la conexión entre la gente de las Forbidden Lands y los lugares que habitan. La experiencia de caza definitiva te espera en Monster Hunter Wilds. Historia: Hace unos pocos años, un joven llamado Nata fue rescatado en los límites de las Forbidden Lands, una región inexplorada donde el gremio aún no se ha adentrado. Tras escuchar la historia del muchacho sobre su solitario escape de un monstruo misterioso que atacó su aldea, el gremio organizó una expedición a las Forbidden Lands para investigar. Un mundo vivo: Los entornos de las Forbidden Lands pueden cambiar drásticamente junto con las súbitas y constantes variaciones del clima. Durante los duros y peligrosos periodos de Barbecho e Inclemencia, terribles monstruos se lanzan a cazar en manadas, aunque durante los periodos de Abundancia, la naturaleza es rica y copiosa.",
            video: "https://www.youtube.com/embed/TG_yZuxRme4",
            precio: 31990,
            imagen: "public/images/xbox/Monster hunter wilds XBOX.png"
        },

        {
            id:33,
            nombre:"Peronsa 5 ",
            consola:"XBOX SERIES X|S",
            descripcion:"Prepárate para la galardonada experiencia de juego de rol en esta edición definitiva de Persona 5 Royal, ¡con un tesoro escondido de contenido descargable incluido!. Obligado a cambiarse a un instituto en Tokio, el protagonista tiene un sueño extraño. 'En verdad eres un prisionero del destino. Te espera la perdición en el futuro cercano'. Con el objetivo de la 'rehabilitación' acechando por encima, debe salvar a otros de los deseos distorsionados poniéndose la máscara de un Ladrón Fantasma.",
            video: "https://www.youtube.com/embed/2smqR3An4s4",
            precio: 43990,
            imagen: "public/images/xbox/Peronsa 5 XBOX.png"
        },

        {
            id:34,
            nombre:"Tony hawks pro skater ",
            consola:"XBOX SERIES X|S",
            descripcion:"Prepárate para el regreso de la legendaria franquicia con Tony Hawk's™ Pro Skater™ 3 + 4. Todo lo que te encantó está de vuelta, ahora con más skaters, nuevas pistas, increíbles trucos, música que te reventará los oídos y mucho más. Cuéntales a tus vecinos y ve por tus amigos patinadores, porque el skate no ha muerto. Volvió y está más vivo que nunca.",
            video: "https://www.youtube.com/embed/Swx5ra133d4",
            precio: 22990,
            imagen: "public/images/xbox/Tony hawks pro skater XBOX.png"
        },
        
        {
            id:35,
            nombre:"Call of duty black ops 7 ",
            consola:"XBOX SERIES X|S",
            descripcion:"El año es 2035 y el mundo está al borde del caos, devastado por conflictos violentos y guerra psicológica. David Mason lidera un equipo élite del Comando Conjunto de Operaciones Especiales en una misión encubierta en la extensa ciudad mediterránea de Avalon. Ahí, el equipo descubre una sofisticada trama que no solo sumirá al mundo en el caos, sino que los arrastra a sus propios pasados perturbadores. Forma un pelotón o juega en solitario en una innovadora Campaña cooperativa que redefine la experiencia de Black Ops. Enfréntate a desafíos de alto riesgo en una amplia variedad de entornos, desde los tejados iluminados de luces neón en Japón hasta la costa mediterránea, e incluso en los rincones más recónditos de la psique humana. El modo Multijugador arranca con fuerza con 16 emocionantes mapas 6c6 y 2 mapas 20c20 en el lanzamiento. Desde el horizonte futurista de Tokio hasta las gélidas y despiadadas tierras salvajes de Alaska, todos los entornos están llenos de peligros y oportunidades. Domina un arsenal de última generación y supera a tus enemigos con un sistema de movimiento omnidireccional evolucionado.",
            video: "https://www.youtube.com/embed/dZdRDyYGoQg",
            precio: 79990,
            imagen: "public/images/xbox/Call of duty black ops 7 XBOX.png"
        },
        //JUEGOS XBOX SERIES X|S


        // JUEGOS NINTENDO SWITCH
        {
            id:36,
            nombre:"Mario kart world  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"¡Acelera a través de un mundo abierto con Mario y sus amigos!. En esta gigantesca evolución de la serie Mario Kart todo este mundo es tu pista de carreras. Gracias a las carreras que permiten la participación de hasta 24 pilotos, ¡la competencia será supremamente reñida!.Corre de una pista a la siguiente por rutas interconectadas que abarcan todo el mundo. Cruza por montañas, bosques, ciudades y más, bien sea de día o de noche, con patrones climáticos que cambian. ¡Todo está conectado! ",
            video: "https://www.youtube.com/embed/kEVBSZk51R0",
            precio: 85990,
            imagen: "public/images/nintendo/Mario kart world switch 2.png",
        },
        

        {
            id:37,
            nombre:"Donkey Kong bananza  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"¡El robusto fortachón está de regreso y viene acompañado!.¡Explora un vasto mundo subterráneo con Donkey Kong y Pauline, y ábrete paso destruyéndolo todo!. Con la fuerza bruta de Donkey Kong y el inigualable canto de Pauline, podrás atravesar paredes, crear túneles con tus puños, descender por el suelo con tus golpes e incluso arrancar y arrojar bloques de terreno para romper las barreras de la exploración. Entre más destruyas, más áreas estarán disponibles para avanzar.",
            video: "https://www.youtube.com/embed/wxCQ2Ht_UKA",
            precio: 75990,
            imagen: "public/images/nintendo/Donkey Kong bananza switch 2.png",
        },
        

        {   
            id:38,
            nombre:"Daemon x machine  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"Rediseña tu ser y liberarás tu porvenir. Conviértete en el guerrero tecnológico definitivo en esta nueva entrega llena de acción de la saga Daemon X Machina. Vuela a la batalla en tu arsenal personalizado y realiza una amplia variedad de ataques adaptados a tu estilo de juego. Siente la emoción de un combate trepidante mientras exploras un mundo abierto letal y peligroso por tierra o aire. Después de acabar con tus enemigos, recoge sus armas y equipo, y mejora tus habilidades para tener más opciones en el campo de batalla. Prepárate para una historia oscura de ciencia ficción en la que debes enfrentarte a batallas titánicas contra jefes en solitario o con hasta dos amigos en línea. Tanto los jugadores nuevos de Daemon X Machina como los veteranos podrán disfrutar de una aventura increíble en el último título de Marvelous First Studio. Una evolución titánica. La intensa acción blindada de Daemon X Machina se estrena en una nueva generación de plataformas, y lo hace con una aventura épica de ciencia ficción, una jugabilidad accesible a principiantes y un escenario más amplio que no dejará indiferentes a los fans de siempre.",
            video: "https://www.youtube.com/embed/6sHddSbHM_A",
            precio: 58990,
            imagen: "public/images/nintendo/Donkey Kong bananza switch 2.png",
        },
        

        {
            id:39,
            nombre:"Kirby air riders  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"Acción con vehículos que no se detiene. ¡Selecciona a tu piloto, escoge tu nave y prepárate para la competencia! Enfréntate a tus rivales en frenéticas competencias en el coliseo o veloces carreras por tierra y aire. Utiliza la opción Tomar impulso para frenar y controlar tus vueltas mientras tu nave busca ganar velocidad automáticamente. ¡Llena el medidor de carga mientras derrapas por las curvas y úsalo para desatar un explosivo aceleramiento!",
            video: "https://www.youtube.com/embed/oJVsNMp_nAU",
            precio: 82990,
            imagen: "public/images/nintendo/Kirby air riders switch 2.png",
        },
        

        {
            id:40,
            nombre:"Little nightmares 3  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"Enfrenten sus miedos infantiles juntos. Dos jóvenes amigos, perdidos en un mundo aterrador no apto para niños. Si no pueden encontrar una salida de este lugar llamado 'la Nada', estarán condenados a un destino peor que la muerte. ENFRENTEN SUS MIEDOS INFANTILES JUNTOS. Jugarás con Low y Alone, mejores amigos desde que se encontraron en esta solitaria pesadilla. Cada uno posee su propio elemento icónico: un arco para Low y una llave inglesa para Alone. Trabajando en equipo, se han vuelto expertos en deslizarse por pasajes ocultos, levantar al otro sobre enormes obstáculos y cuidarse mutuamente las espaldas. Ya sea que juegues con un amigo o con un compañero de IA, dependerás de los objetos icónicos de cada protagonista para crear oportunidades y avanzar. El entorno está lleno de pistas y posibilidades que los niños más creativos pueden aprovechar. Las flechas de Low pueden alcanzar objetivos altos, cortar cuerdas o derribar enemigos voladores, y la llave inglesa de Alone es ideal para aplastar enemigos aturdidos, romper barreras o manipular el funcionamiento de enormes máquinas. EMBÁRCATE EN UNA AVENTURA INMERSIVA Y PERTURBADORA",
            video: "https://www.youtube.com/embed/GpRglVln5Bk",
            precio: 73990,
            imagen: "public/images/nintendo/Little nightmares 3 switch 2.png",
        },
        

        {
            id:41,
            nombre:"Kirby and the forgottenland  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"¡Únete a Kirby en una aventura inolvidable!. Explora escenarios de plataformas en 3D mientras descubres un misterioso mundo, rescatas a los cautivos Waddle Dees y derrotas a la temible jauría. ¡Esperamos que anheles emprender tu aventura!. ¡Devela el misterio del meteorito! En esta emocionante aventura, después de que el mundo es golpeado por un poderoso meteorito, Kirby deberá usar sus increíbles habilidades (incluyendo algunas nuevas transmorfosis) para abrirse paso a través de territorio inexplorado.",
            video: "https://www.youtube.com/embed/PADxIwbJn7U",
            precio: 79990,
            imagen: "public/images/nintendo/Kirby and the forgottenland switch 2.png",
        },
        

        {
            id:42,
            nombre:"Pokemon legends  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"Vive la vida de un Entrenador Pokémon en las calles de Ciudad Luminalia. No importa si eres un fan de siempre de Pokémon o si es la primera vez que lanzas una Pokébola porque el juego Leyendas Pokémon: Z-A – Nintendo Switch 2 Edition tiene un montón de diversión para ofrecer a todo tipo de Entrenadores. Disfruta la mecánica de juego tradicional con toques modernos que seguramente transformarán tu experiencia de juego de rol al estilo de Pokémon. ¡Atrapa, combate y megaevoluciona en tiempo real!",
            video: "https://www.youtube.com/embed/i3s0c0DyobQ",
            precio: 74990,
            imagen: "public/images/nintendo/Pokemon legends switch 2.png",
        },
        

        {
            id:43,
            nombre:"Persona 3  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"Entra a la Hora Oscura, donde se difumina la línea entre lo ordinario y lo sobrenatural. Sella tu destino con Persona 3 Reload, ¡en Nintendo Switch™ 2!. Sumérgete en la Hora Oscura y despierta las profundidades de tu corazón. Ponte en la piel de un estudiante trasladado que se ve abocado a un destino inesperado al entrar en la hora 'oculta' entre un día y otro. Despierta un poder increíble y persigue los misterios de la Hora Oscura, lucha por tus amigos y deja una marca en sus recuerdos para siempre. Persona 3 Reload es una cautivadora reimaginación del RPG que definió el género, renacido para la era moderna.",
            video: "https://www.youtube.com/embed/hVcHF5_UtM0",
            precio: 74990,
            imagen: "public/images/nintendo/Persona 3 switch 2.png",
        },
        

        {
            id:44,
            nombre:"The legend of Zelda breath of the wild  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"Tu épica aventura ha sido mejorada para la consola Nintendo Switch 2. Sin reino. Sin recuerdos. Después de un letargo que ha durado 100 años, Link se despierta solo en un mundo que ya no recuerda. Ahora, el héroe legendario debe explorar ese extenso y misterioso mundo y recuperar sus recuerdos antes de que Hyrule esté perdido para siempre. Con mayor resolución, velocidad de reproducción de imágenes y compatibilidad HDR en televisores aptos, el extenso mundo de Hyrule jamás lució mejor.",
            video: "https://www.youtube.com/embed/dmDD7JSfhcE",
            precio: 79990,
            imagen: "public/images/nintendo/The legend of Zelda breath of the wild switch 2.png",
        },
        

        {
            id:45,
            nombre:"The legend of Zelda tears of the kingdom  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"En esta secuela del juego The Legend of Zelda: Breath of the Wild, decidirás tu propio camino a través de los extensos paisajes de Hyrule y las misteriosas islas flotantes en las alturas del vasto cielo. ¿Podrás dominar las habilidades de Link para luchar contra las fuerzas oscuras que amenazan al reino?. Continúa tu aventura o comienza una nueva. Con dos archivos de guardado, podrás comenzar una nueva aventura o continuar la anterior con tus datos de guardado existentes. ",
            video: "https://www.youtube.com/embed/fYZuiFDQwQw",
            precio: 84990,
            imagen: "public/images/nintendo/The legend of Zelda tears of the kingdom switch 2.png",
        },
        

        {
            id:46,
            nombre:"Split fiction  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"Vive una aventura cooperativa alucinante en Split Fiction. Disfruta de una aventura alucinante que traspasa los límites de lo conocido mientras te adentras en los diversos mundos de Split Fiction, una aventura cooperativa del estudio desarrollador de It Takes Two (título ganador del Juego del año 2021). Mio y Zoe son escritoras opuestas que se dedican a hacer historias de ciencia ficción y fantasía. Ambas quedan atrapadas en sus propias historias después de que las conectaran a una máquina diseñada para robar sus ideas creativas. Tendrán que confiar mutuamente para liberarse con sus recuerdos intactos, trabajando en equipo para dominar una variedad de habilidades y superar diversos desafíos mientras saltan entre mundos de ciencia ficción y fantasía en esta inesperada historia de amistad. Esta aventura en pantalla dividida está diseñada para dos personas. Descubre un juego cooperativo en el que tendrás que coordinar y sincronizar tus acciones, así como trabajar en equipo, para superar los desafíos. Invita a una amistad a jugar contigo gratis, para un juego multiplataforma, con el Pase de amigo*.",
            video: "https://www.youtube.com/embed/zXQ7sjNV35k",
            precio: 59990,
            imagen: "public/images/nintendo/Split fiction switch 2.png",
  },

        {
            id:47,
            nombre:"Super Mario party jamboree  ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"Muestra tu sonrisa en el juego con CameraPlay. Los rostros de los jugadores podrán verse en plena acción mediante CameraPlay durante los minijuegos y en el tablero de juego. Además, ¡esta función podrá registrar los movimientos de los jugadores para habilitar los controles por movimiento para todo el cuerpo en minijuegos seleccionados! luidez con el control por mouse. Coloca el Joy-Con™ 2 de lado para usarlo como si fuera un mouse en modos compatibles. ¡Desplázate y selecciona fácilmente! Además, con la vibración HD 2, los efectos del control se sentirán aún más reales.",
            video: "https://www.youtube.com/embed/GCKymrX1-kM",
            precio: 84990,
            imagen: "public/images/nintendo/Super Mario party jamboree switch 2.png",
        },
        

        {
            id:48,
            nombre:"Stars wars outlaws ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"DESCUBRE UNA GALAXIA DE OPORTUNIDADES. Explora lugares únicos, con ciudades y cantinas bulliciosas. Recorre enormes paisajes en tu speeder. Cada ubicación trae nuevas aventuras, desafíos únicos y recompensas atractivas, si te atreves a arriesgarte. VIVE LA HISTORIA ORIGINAL DE UNA BUSCAVIDAS. Vive la arriesgada vida de una forajida. Dale la vuelta a cualquier situación con la ayuda de Nix, lucha con tu bláster, derrota a enemigos con sigilo y artilugios o encuentra el momento adecuado para distraerlos y ganar ventaja. EMBÁRCATE EN MISIONES ARRIESGADAS. Embárcate en misiones arriesgadas de los sindicatos del crimen de toda la galaxia, pero con grandes recompensas. Roba objetos valiosos, infíltrate en ubicaciones secretas y engaña a tus enemigos jugando como una de las forajidas más buscadas de la galaxia. Todas las elecciones que tomes influirán en tu reputación.",
            video: "https://www.youtube.com/embed/4l4c3X0UTVI",
            precio: 79990,
            imagen: "public/images/nintendo/Stars wars outlaws switch 2.png",
        },
        

        {
            id:49,
            nombre:"Street fighter 6 ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"¡Llegó el esperado lanzamiento de Street Fighter™ 6 en la Nintendo Switch™ 2!. ¡Hora de salir a la calle! Street Fighter™ 6 representa la siguiente evolución de la serie Street Fighter™, con tres modos de juego distintos, jugabilidad innovadora y gráficos mejorados en todos los aspectos del juego. Pelea y llega hasta la cima con todo el contenido nuevo y los modos de juego exclusivos para Nintendo Switch 2, como Combate de red local 1 vs 1 y Combates de avatares. Disfruta nuevos modos que aprovecharán los controles Joy-Con™ de Nintendo Switch, como Combate Gyro y Campeonato calórico, donde el jugador que queme la mayor cantidad de calorías será el vencedor. Juega en modo semiportátil y accede a los tres tipos de control (clásico, moderno y dinámico) en tu Joy-Con. Un catálogo diverso de 18 luchadores. Juega con los maestros legendarios y los nuevos favoritos del público, como Ryu, Chun-Li, Luke, Jamie y muchos más, en esta nueva edición donde cada personaje cuenta con rediseños impresionantes y especiales cinemáticos emocionantes.",
            video: "https://www.youtube.com/embed/VafUG2-98tg",
            precio: 62990,
            imagen: "public/images/nintendo/Street fighter 6 switch 2.png"
        },
        

        {
            id:50,
            nombre:"Yakuza 0 directors cut ",
            consola:"NINTENDO SWITCH 2",
            descripcion:"Descubre la decadencia y el peligro de Japón en 1988. Descubre la decadencia y el peligro de Japón en 1988. Yakuza 0 Director's Cut es la edición definitiva de la historia inicial aclamada por la crítica, ahora en Nintendo Switch™ 2. Lucha con todas tus fuerzas en los distritos de entretenimiento de Tokio y Osaka como el yakuza Kazuma Kiryu y el gerente del club de cabaret Goro Majima en un drama policial épico con destinos entrelazados que crearon leyendas. Kiryu y Majima tienen tres estilos de lucha únicos e intercambiables para aplastar cráneos con tus puños, improvisar armas y mucho más. Todos podrán disfrutar de emocionantes peleas con controles fáciles de usar y un alto límite de habilidad. El contenido de Director's Cut te sumerge en los incidentes clave y el trasfondo de los personajes con cinemáticas jamás vistas. Además, el modo multijugador en línea 'Redada en el barrio rojo' te permite unir fuerzas con amigos y elegir entre 60 personajes jugables para aplastar hordas de enemigos.",
            video: "https://www.youtube.com/embed/iUB8pU9higg",
            precio: 65990,
            imagen: "public/images/nintendo/Yakuza 0 directors cut switch 2.png"
        },
        //JUEGOS NINTENDO SWITCH
    ];

    const juego = juegos.find(j => j.id === id);
    return juego || { descripcion: "Descripción no disponible", video: "" };
}
// DETALLES DE LOS JUEGOS


// FUNCION PARA LA BD




export async function registrarUsuario(setMensajeTexto, setMensajeVisible) {
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const errores = [];

  // --- Validaciones
  if (nombre.length > 100) errores.push("El nombre no puede tener más de 100 caracteres.");
  if (apellido.length > 100) errores.push("El apellido no puede tener más de 100 caracteres.");
  if (!(correo.endsWith('@duocuc.cl') || correo.endsWith('@profesor.duoc.cl') || correo.endsWith('@gmail.com')))
    errores.push("El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com");
  if (password.length < 5 || password.length > 20)
    errores.push("La contraseña debe tener entre 5 y 20 caracteres.");
  if (!/[0-9]/.test(password))
    errores.push("La contraseña debe tener al menos un número.");
  if (password !== confirmPassword)
    errores.push("Las contraseñas no coinciden.");

  const errorContainer = document.getElementById('errores');

  if (errores.length > 0) {
    errorContainer.innerHTML = errores.join('<br>');
    return;
  }

  errorContainer.innerHTML = "";

  try {

    const { data: userExists, error: userError } = await supabase
      .from('usuarios')
      .select('correo')
      .eq('correo', correo)
      .maybeSingle();


    const { data: adminExists, error: adminError } = await supabase
      .from('administradores')
      .select('correo')
      .eq('correo', correo)
      .maybeSingle();

    if (userError || adminError) throw new Error("Error consultando la base de datos");


    if (userExists || adminExists) {
      setMensajeTexto("❌ Error correo ya registrado");
      setMensajeVisible(true);
      setTimeout(() => setMensajeVisible(false), 3000);
      return;
    }


    const { error } = await supabase
      .from('usuarios')
      .insert([{ nombre, apellido, correo, contrasena: password }]);

    if (error) throw error;


    setMensajeTexto("✅ Registro exitoso");
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000);

    document.getElementById('registerForm').reset();

  } catch (err) {
    console.error(err);
    setMensajeTexto("❌ Error correo ya registrado");
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000);
  }
}


//Login con la base de datos



export async function validarLogin(correo, password, setMensajeTexto, setMensajeVisible, setError) {

  setError('');

  if (!correo || !password) {
    setError("Por favor, completa todos los campos.");
    return false;
  }

  const regexCorreo = /^[^\s@]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!regexCorreo.test(correo)) {
    setError("Correo electrónico incorrecto");
    return false;
  }

  if (password.length < 5) {
    setError("La contraseña debe tener al menos 5 caracteres.");
    return false;
  }


  const { data: user, error: userError } = await supabase
    .from('usuarios')
    .select('*')
    .eq('correo', correo)
    .single();


  let userFound = user;
  let tipoUsuario = 'usuario';

  if ((!userFound || userError) && !userFound?.id) {
    const { data: admin, error: adminError } = await supabase
      .from('administradores')
      .select('*')
      .eq('correo', correo)
      .single();

    if (admin && !adminError) {
      userFound = admin;
      tipoUsuario = 'admin';
    }
  }


  if (!userFound || userFound.contrasena !== password) {
    setError("Correo o contraseña incorrectos");
    return false;
  }


  setMensajeTexto("✅ Inicio de sesión exitoso");
  setMensajeVisible(true);
  setTimeout(() => setMensajeVisible(false), 3000);


  localStorage.setItem(
    "usuario",
    JSON.stringify({
      correo: userFound.correo,
      id: userFound.id,
      tipo: tipoUsuario,
      nombre: userFound.nombre,
      apellido: userFound.apellido
    })
  );

  return true;
}





// PANEL ADMIN

// Usuarios
export async function cargarUsuarios() {
  const { data, error } = await supabase.from("usuarios").select("*");
  if (error) throw new Error(error.message);
  return data;
}

// Administradores
export async function cargarAdmins() {
  const { data, error } = await supabase.from("administradores").select("*");
  if (error) throw new Error(error.message);
  return data;
}

// Órdenes con detalle de productos
export async function cargarOrdenes() {
  try {
    const { data, error } = await supabase
      .from("compras")
      .select(`
        id,
        nombre,
        apellido,
        correo,
        total,
        fecha,
        compra_detalle (
          producto_nombre,
          consola,
          cantidad,
          precio
        )
      `)
      .order('fecha', { ascending: false });

    if (error) throw error;

    // Mapear para que cada orden tenga productos
    return data.map((compra) => ({
      id: compra.id,
      nombre: compra.nombre,
      apellido: compra.apellido,
      correo: compra.correo,
      total: compra.total,
      fecha: compra.fecha,
      productos: compra.compra_detalle || []
    }));

  } catch (err) {
    console.error("Error cargando ordenes:", err.message);
    return [];
  }
}

// Agregar administrador
export async function agregarAdministrador(nuevoAdmin) {

  if (
    !nuevoAdmin.nombre ||
    !nuevoAdmin.apellido ||
    !nuevoAdmin.correo ||
    !nuevoAdmin.contrasena
  ) {
    throw new Error("Por favor completa todos los campos.");
  }

  const errores = [];

  const nombre = nuevoAdmin.nombre.trim();
  const apellido = nuevoAdmin.apellido.trim();
  const correo = nuevoAdmin.correo.trim().toLowerCase();
  const contrasena = nuevoAdmin.contrasena;


  if (nombre.length > 100)
    errores.push("El nombre no puede tener más de 100 caracteres.");
  if (apellido.length > 100)
    errores.push("El apellido no puede tener más de 100 caracteres.");
  if (
    !(
      correo.endsWith("@duocuc.cl") ||
      correo.endsWith("@profesor.duoc.cl") ||
      correo.endsWith("@gmail.com")
    )
  )
    errores.push(
      "El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com."
    );
  if (contrasena.length < 5 || contrasena.length > 20)
    errores.push("La contraseña debe tener entre 5 y 20 caracteres.");
  if (!/[0-9]/.test(contrasena))
    errores.push("La contraseña debe tener al menos un número.");

  if (errores.length > 0) {
    throw new Error(errores.join("\n"));
  }


  const { data: usuarioExiste, error: errorUsuarios } = await supabase
    .from("usuarios")
    .select("correo")
    .eq("correo", correo)
    .maybeSingle();

  if (errorUsuarios) throw new Error("Error al verificar usuarios.");

  if (usuarioExiste) {
    throw new Error("Este correo ya está registrado como usuario.");
  }


  const { data: adminExiste, error: errorAdmins } = await supabase
    .from("administradores")
    .select("correo")
    .eq("correo", correo)
    .maybeSingle();

  if (errorAdmins) throw new Error("Error al verificar administradores.");

  if (adminExiste) {
    throw new Error("Este correo ya está registrado como administrador.");
  }


  const { error: insertError } = await supabase
    .from("administradores")
    .insert([{ nombre, apellido, correo, contrasena }]);

  if (insertError) throw new Error(insertError.message);

  return true;
}



// Eliminar usuario
export async function eliminarUsuario(id) {
  const { error } = await supabase.from("usuarios").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}

// Generar reportes
export function generarReporte(tipo, usuarios, admins, ordenes) {
  const libro = XLSX.utils.book_new();

  if (tipo === "usuarios") {
    const hojaUsuarios = XLSX.utils.json_to_sheet(usuarios);
    XLSX.utils.book_append_sheet(libro, hojaUsuarios, "Usuarios");
  }

  if (tipo === "admins") {
    const hojaAdmins = XLSX.utils.json_to_sheet(admins);
    XLSX.utils.book_append_sheet(libro, hojaAdmins, "Administradores");
  }

  if (tipo === "compras") {
    const filas = [];

    ordenes.forEach((o) => {
      if (Array.isArray(o.productos) && o.productos.length > 0) {
        o.productos.forEach((p) => {
          filas.push({
            CompraID: o.id,
            Comprador: `${o.nombre} ${o.apellido}`,
            Correo: o.correo,
            Producto: p.producto_nombre,
            Consola: p.consola,
            Cantidad: p.cantidad,
            Precio: p.precio,
            Subtotal: (p.precio * p.cantidad),
            TotalCompra: o.total,
            Fecha: o.fecha ? new Date(o.fecha).toLocaleDateString() : "",
          });
        });
      } else {
        filas.push({
          CompraID: o.id,
          Comprador: `${o.nombre} ${o.apellido}`,
          Correo: o.correo,
          Producto: "Sin productos",
          Consola: "",
          Cantidad: 0,
          Precio: 0,
          Subtotal: 0,
          TotalCompra: o.total.toFixed(2),
          Fecha: o.fecha ? new Date(o.fecha).toLocaleDateString() : "",
        });
      }
    });

    const hojaOrdenes = XLSX.utils.json_to_sheet(filas);


    const columnas = Object.keys(filas[0] || {}).map(key => ({ wch: Math.max(key.length, 15) }));
    hojaOrdenes['!cols'] = columnas;

    XLSX.utils.book_append_sheet(libro, hojaOrdenes, "Compras");
  }

  XLSX.writeFile(libro, "reporte_microplai.xlsx");
}




//llena campos del carrito si estas logeado

export function llenarDatos() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (usuario) {
    return {
      nombre: usuario.nombre || "",
      apellido: usuario.apellido || "",
      correo: usuario.correo || "",
      direccion: "",
      indicacion: ""
    };
  }
  return {
    nombre: "",
    apellido: "",
    correo: "",
    direccion: "",
    indicacion: ""
  };
}


//asdad

export function mostrarMensaje(setMensajeTexto, setMensajeVisible, texto, duracion = 2000) {
  setMensajeTexto(texto);
  setMensajeVisible(true);
  setTimeout(() => setMensajeVisible(false), duracion);
}


// validar carrito

export async function confirmarCompraCarrito({
  carrito,
  setCarrito,
  setMensajeVisible,
  setMensajeTexto,
  setMostrarFormulario,
  datosFormulario,
}) {
  if (!carrito || carrito.length === 0) {
    mostrarMensaje(setMensajeTexto, setMensajeVisible, "❌ No se puede pagar, el carrito está vacío");
    return;
  }

  const { nombre, apellido, correo, direccion, indicaciones } = datosFormulario;

  if (!nombre || !apellido || !correo || !direccion) {
    mostrarMensaje(setMensajeTexto, setMensajeVisible, "⚠️ Por favor, completa todos los campos obligatorios");
    return;
  }

  try {

    const totalCompra = Math.round(carrito.reduce((acc, item) => acc + item.precio * (item.cantidad || 1), 0));

    // Insertar la compra directamente, sin validar usuario en la DB
    const { data: compraData, error: compraError } = await supabase
      .from("compras")
      .insert([{
        nombre,
        apellido,
        correo,
        total: totalCompra,
        direccion,
        indicaciones
      }])
      .select()
      .single();

    if (compraError) throw compraError;

    // Insertar los detalles de la compra
    const detalles = carrito.map(item => ({
      compra_id: compraData.id,
      producto_nombre: item.nombre,
      consola: item.consola,
      cantidad: item.cantidad || 1,
      precio: item.precio
    }));

    const { error: detalleError } = await supabase
      .from("compra_detalle")
      .insert(detalles);

    if (detalleError) throw detalleError;

    // 4️⃣ Limpiar carrito
    setCarrito([]);
    localStorage.removeItem("carrito");

    mostrarMensaje(setMensajeTexto, setMensajeVisible, "✅ Compra confirmada correctamente");
    setMostrarFormulario(false);

  } catch (error) {
    console.error(error);
    mostrarMensaje(setMensajeTexto, setMensajeVisible, "❌ Error al registrar la compra");
  }
}
