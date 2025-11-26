import * as XLSX from "xlsx";
import emailjs from "@emailjs/browser";

//funcion validar el formulario para contacto
export function valformulario(event) {
  event.preventDefault();

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



export function moverCarrusel(direccion) {
  const carrusel = document.getElementById("carousel-productos");
  if (!carrusel) return;

  const scrollAmount = 300; // cantidad que avanza por click

  carrusel.scrollBy({
    left: direccion * scrollAmount,
    behavior: "smooth"
  });
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


// FUNCION PARA LA BD

export async function registrarUsuario(
  { nombre, apellido, correo, password, confirmPassword },
  setMensajeTexto,
  setMensajeVisible,
  setErrores
) {
  const erroresLocales = [];

  if (nombre.length > 100) erroresLocales.push("El nombre no puede tener más de 100 caracteres.");
  if (apellido.length > 100) erroresLocales.push("El apellido no puede tener más de 100 caracteres.");
  if (!(correo.endsWith('@duocuc.cl') || correo.endsWith('@profesor.duoc.cl') || correo.endsWith('@gmail.com')))
    erroresLocales.push("El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com");
  if (password.length < 5 || password.length > 20)
    erroresLocales.push("La contraseña debe tener entre 5 y 20 caracteres.");
  if (!/[0-9]/.test(password))
    erroresLocales.push("La contraseña debe tener al menos un número.");
  if (password !== confirmPassword)
    erroresLocales.push("Las contraseñas no coinciden.");

  if (erroresLocales.length > 0) {
    setErrores(erroresLocales);
    return;
  }

  try {
    const response = await fetch('http://localhost:8081/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, correo, contrasena: password })
    });

    const rawText = await response.text();
    let data = {};

    try {
      data = JSON.parse(rawText);
    } catch {
      data = { message: rawText };
    }

    if (!response.ok) {

      if (rawText.includes("duplicate key") || rawText.includes("correo") && rawText.includes("already")) {
        setErrores(["❌ El correo ya está registrado"]);
        return;
      }

      setErrores([data.message || "❌ Error registrando usuario"]);
      return;
    }

    setMensajeTexto(data.message || "✅ Registro exitoso");
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000);

  } catch (err) {
    console.error(err);
    setErrores(["❌ Error de conexión con el servidor"]);
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

  try {
    const response = await fetch('http://localhost:8081/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena: password })
    });

    const data = await response.json();

    if (!response.ok || data.message !== "Login exitoso") {
      setError(data.message || 'Usuario o contraseña incorrectos');
      return false;
    }


    localStorage.setItem(
      "usuario",
      JSON.stringify({
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        rol: data.rol
      })
    );

    setMensajeTexto(data.message);
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 3000);

    return true;

  } catch (err) {
    console.error(err);
    setError("❌ Error de conexión con el servidor");
    return false;
  }
}




//---------------------------------------------------------------PANEL ADMIN----------------------------------------------------------------------------------------------------

// carga Usuarios
export async function cargarUsuarios() {
  const resp = await fetch("http://localhost:8081/api/auth/usuarios");
  if (!resp.ok) throw new Error("Error cargando usuarios");
  return await resp.json();
}

// Órdenes con detalle de productos
export async function cargarOrdenes() {
  try {
    const resp = await fetch("http://localhost:8082/api/carrito/compras");

    if (!resp.ok) {
      throw new Error("Error cargando órdenes desde la API");
    }

    const data = await resp.json();

    return data.map((compra) => ({
      id: compra.id,
      nombre: compra.nombre,
      apellido: compra.apellido,
      correo: compra.correo,
      total: compra.total,
      fecha: compra.fecha,

      productos: compra.productos || [],     // texto resumido lo crea Administrador.jsx
      productosRaw: compra.productos || []   // 🔥 NECESARIO para Ver más
    }));

  } catch (err) {
    console.error("Error cargando órdenes:", err.message);
    return [];
  }
}



// Eliminar usuario
export async function eliminarUsuario(id) {
  const resp = await fetch(`http://localhost:8081/api/auth/usuarios/${id}`, {
    method: "DELETE"
  });


  let data = null;
  try {
    data = await resp.json();
  } catch {
    // try del delete
  }

  if (!resp.ok) {
    throw new Error(data?.message || "Error eliminando usuario");
  }

  return true;
}



// actualizar usuario desde panel de admin
export async function actualizarUsuarioPanelAdmin(
  id,
  { nombre, apellido, correo, rol, nuevaContrasena }
) {
  if (!id) throw new Error("ID de usuario inválido.");

  const errores = [];

  const nombreTrim = (nombre || "").trim();
  const apellidoTrim = (apellido || "").trim();
  const correoTrim = (correo || "").trim().toLowerCase();
  const rolTrim = (rol || "").trim().toUpperCase();
  const passTrim = (nuevaContrasena || "").trim();

  if (!nombreTrim) errores.push("El nombre es obligatorio.");
  if (!apellidoTrim) errores.push("El apellido es obligatorio.");
  if (!correoTrim) errores.push("El correo es obligatorio.");
  if (!rolTrim) errores.push("El rol es obligatorio.");

  if (nombreTrim.length > 100)
    errores.push("El nombre no puede tener más de 100 caracteres.");

  if (apellidoTrim.length > 100)
    errores.push("El apellido no puede tener más de 100 caracteres.");

  if (
    !(
      correoTrim.endsWith("@duocuc.cl") ||
      correoTrim.endsWith("@profesor.duoc.cl") ||
      correoTrim.endsWith("@gmail.com")
    )
  ) {
    errores.push("El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com.");
  }

  if (passTrim) {
    if (passTrim.length < 5 || passTrim.length > 20)
      errores.push("La contraseña debe tener entre 5 y 20 caracteres.");

    if (!/[0-9]/.test(passTrim))
      errores.push("La contraseña debe tener al menos un número.");
  }

  if (errores.length > 0) {
    throw new Error(errores.join("\n"));
  }

  const body = {
    nombre: nombreTrim,
    apellido: apellidoTrim,
    correo: correoTrim,
    rol: rolTrim,
  };

  if (passTrim) {
    body.contrasena = passTrim;
  }

  const resp = await fetch(`http://localhost:8081/api/auth/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });


  let data = null;
  try {
    data = await resp.json();
  } catch (_) {

    data = null;
  }

  if (!resp.ok) {
    throw new Error(data?.message || "Error actualizando usuario");
  }

  return true;
}




// Generar reportes
export async function generarReporte(tipo) {
  let datos = [];
  let nombreHoja = "";


  if (tipo === "usuarios") {
    const resp = await fetch("http://localhost:8081/api/auth/usuarios");

    if (!resp.ok) {
      alert("⚠ Error obteniendo usuarios desde la API");
      return;
    }

    const usuarios = await resp.json();

    datos = usuarios.filter(u => u.rol !== "ADMINISTRADOR");
    nombreHoja = "Usuarios";
  }

  if (tipo === "admins") {
    const resp = await fetch("http://localhost:8081/api/auth/usuarios?rol=ADMINISTRADOR");

    if (!resp.ok) {
      alert("⚠ Error obteniendo administradores desde la API");
      return;
    }

    datos = await resp.json();
    nombreHoja = "Administradores";
  }

  if (tipo === "compras") {
    const resp = await fetch("http://localhost:8082/api/carrito/compras");

    if (!resp.ok) {
      alert("⚠ Error obteniendo compras desde la API");
      return;
    }

    const ordenes = await resp.json();
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
            Subtotal: p.precio * p.cantidad,
            TotalCompra: o.total,
            Fecha: o.fecha ? new Date(o.fecha).toLocaleDateString("es-CL") : "",
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
          TotalCompra: o.total,
          Fecha: o.fecha ? new Date(o.fecha).toLocaleDateString("es-CL") : "",
        });
      }
    });

    datos = filas;
    nombreHoja = "Compras";
  }

  const libro = XLSX.utils.book_new();
  const hoja = XLSX.utils.json_to_sheet(datos);


  const columnas = Object.keys(datos[0] || {}).map((key) => ({
    wch: Math.max(key.length, 15),
  }));
  hoja["!cols"] = columnas;

  XLSX.utils.book_append_sheet(libro, hoja, nombreHoja);


  XLSX.writeFile(libro, `reporte_${tipo}.xlsx`);
}


//Cargar compras
export async function cargarProductos() {
  const resp = await fetch("http://localhost:8080/api/productos");

  if (!resp.ok) {
    throw new Error("Error cargando productos desde la API");
  }

  return await resp.json();
}


// actualizar productos 
export async function actualizarProductoPanelAdmin(id, { nombre, consola, precio }) {
  const errores = [];

  const nombreTrim = (nombre || "").trim();
  const consolaTrim = (consola || "").trim();
  const precioNum = Number(precio);

  if (!nombreTrim) errores.push("El nombre no puede estar vacío.");
  if (!consolaTrim) errores.push("La consola no puede estar vacía.");
  if (Number.isNaN(precioNum) || precioNum < 0)
    errores.push("El precio debe ser un número mayor o igual a 0.");

  if (errores.length > 0) {
    throw new Error(errores.join("\n"));
  }

  const body = {};

  if (nombreTrim) body.nombre = nombreTrim;
  if (consolaTrim) body.consola = consolaTrim;
  if (!isNaN(precioNum)) body.precio = precioNum;

  const resp = await fetch(`http://localhost:8080/api/productos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await resp.json().catch(() => null);

  if (!resp.ok) {
    throw new Error(data?.message || "Error actualizando producto");
  }

  return true;
}




// Crear producto desde el panel de admin
export async function crearProductoPanelAdmin({
  nombre,
  consola,
  descripcion,
  video,
  precio,
  imagen,
}) {
  const errores = [];

  const nombreTrim = (nombre || "").trim();
  const consolaTrim = (consola || "").trim();
  const descripcionTrim = (descripcion || "").trim();
  const videoTrim = (video || "").trim();
  const imagenTrim = (imagen || "").trim();
  const precioNum = Number(precio);


  if (!nombreTrim) errores.push("El nombre no puede estar vacío.");
  if (!consolaTrim) errores.push("La consola no puede estar vacía.");
  if (!imagenTrim) errores.push("La imagen no puede estar vacía.");
  if (Number.isNaN(precioNum) || precioNum < 0)
    errores.push("El precio debe ser un número mayor o igual a 0.");

  if (nombreTrim.length > 255)
    errores.push("El nombre no puede tener más de 255 caracteres.");
  if (consolaTrim.length > 50)
    errores.push("La consola no puede tener más de 50 caracteres.");

  if (errores.length > 0) {
    throw new Error(errores.join("\n"));
  }


  const body = {
    nombre: nombreTrim,
    consola: consolaTrim,
    descripcion: descripcionTrim || null,
    video: videoTrim || null,
    precio: precioNum,
    imagen: imagenTrim
  };

  const resp = await fetch("http://localhost:8080/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(data.message || "Error creando producto");
  }

  return true;
}


// crea usuario desde admin con rol
export async function registrarUsuarioPanelAdmin(nuevoUsuario) {

  const { nombre, apellido, correo, contrasena, rol } = nuevoUsuario;

  const errores = [];

  const nombreTrim = (nombre || "").trim();
  const apellidoTrim = (apellido || "").trim();
  const correoTrim = (correo || "").trim().toLowerCase();
  const passTrim = (contrasena || "").trim();
  const rolTrim = (rol || "").trim().toUpperCase();

  if (!nombreTrim) errores.push("El nombre es obligatorio.");
  if (!apellidoTrim) errores.push("El apellido es obligatorio.");
  if (!correoTrim) errores.push("El correo es obligatorio.");
  if (!rolTrim) errores.push("El rol es obligatorio.");

  if (nombreTrim.length > 100)
    errores.push("El nombre no puede tener más de 100 caracteres.");

  if (apellidoTrim.length > 100)
    errores.push("El apellido no puede tener más de 100 caracteres.");

  if (
    !(
      correoTrim.endsWith("@duocuc.cl") ||
      correoTrim.endsWith("@profesor.duoc.cl") ||
      correoTrim.endsWith("@gmail.com")
    )
  ) {
    errores.push("El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com.");
  }

  if (!passTrim) {
    errores.push("La contraseña es obligatoria.");
  } else {
    if (passTrim.length < 5 || passTrim.length > 20) {
      errores.push("La contraseña debe tener entre 5 y 20 caracteres.");
    }
    if (!/[0-9]/.test(passTrim)) {
      errores.push("La contraseña debe contener al menos un número.");
    }
  }

  if (errores.length > 0) {
    throw new Error(errores.join("\n"));
  }


  const response = await fetch("http://localhost:8081/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: nombreTrim,
      apellido: apellidoTrim,
      correo: correoTrim,
      contrasena: passTrim,
      rol: rolTrim
    })
  });


  const rawText = await response.text();

  let data = {};
  try {
    data = JSON.parse(rawText);
  } catch {
    data = { message: rawText };
  }

  if (!response.ok) {


  if (response.status === 409) {
    throw new Error("❌ El correo ya está registrado");
  }

  if (
    rawText.includes("duplicate key") ||
    rawText.includes("unique constraint") ||
    rawText.includes("already")
  ) {
    throw new Error("❌ El correo ya está registrado");
  }

    throw new Error(data.message || "Error creando usuario.");
  }

  return true;
}






//---------------------------------------------------------------PANEL ADMIN----------------------------------------------------------------------------------------------------




//----------------------------------------------------------------CARRITO-------------------------------------------------------------------------------------------------------

//llena campos del carrito si estas logeado

export function llenarDatos() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (usuario) {
    return {
      nombre: usuario.nombre || "",
      apellido: usuario.apellido || "",
      correo: usuario.correo || "",
      direccion: "",
      indicaciones: ""
    };
  }
  return {
    nombre: "",
    apellido: "",
    correo: "",
    direccion: "",
    indicaciones: ""
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

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuarioId = usuario ? usuario.id : null;

  try {
    const cuerpo = {
      usuarioId: usuarioId,
      nombre,
      apellido,
      correo,
      direccion,
      indicaciones,
      total: carrito.reduce((acc, item) => acc + item.precio * (item.cantidad || 1), 0),
      items: carrito.map(item => ({
        productoNombre: item.nombre,
        consola: item.consola,
        cantidad: item.cantidad,
        precio: item.precio
      }))
    };

    const respuesta = await fetch("http://localhost:8082/api/carrito/compras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo)
    });

    if (!respuesta.ok) throw new Error("Error en la API");

    const data = await respuesta.json();
    console.log("Respuesta del backend:", data);

    setCarrito([]);
    localStorage.removeItem("carrito");

    mostrarMensaje(setMensajeTexto, setMensajeVisible, "✅ Compra registrada exitosamente");
    setMostrarFormulario(false);

  } catch (error) {
    console.error(error);
    mostrarMensaje(setMensajeTexto, setMensajeVisible, "❌ Error al procesar la compra");
  }
}



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


  setMensajeTexto("✅ Añadido al carrito");
  setMensajeVisible(true);
  setTimeout(() => setMensajeVisible(false), 1500);
};


// funcion del formateo del precio para el carrito para que se vea con los puntos y el clp
export function formatearPrecio(valor){
    return valor.toLocaleString("es-CL") + " CLP";
}


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

//----------------------------------------------------------------CARRITO-------------------------------------------------------------------------------------------------------