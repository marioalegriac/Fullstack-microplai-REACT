import React, { useEffect, useState } from "react";
import { inicializarEmailJS } from "../funciones/funciones"; // ✅ USAMOS TU FUNCIÓN

function Contacto() {
  const [toastVisible, setToastVisible] = useState(false);

  // ✅ Inicializa EmailJS SOLO cuando se monta el componente
  useEffect(() => {
    inicializarEmailJS();
  }, []);

  return (
    <main className="contact-pro">

      {/* ✅ TOAST DE CONFIRMACIÓN */}
      {toastVisible && (
        <div className="toast-success">
          <span className="toast-icon">✔</span>
          Mensaje enviado correctamente
        </div>
      )}

      <h1 className="contact-title">Contáctanos</h1>
      <p className="contact-sub">
        Déjanos tu mensaje y te responderemos lo antes posible.
      </p>

      {/* ✅ EL SUBMIT LO MANEJA functions.js */}
      <form className="contact-form-pro" id="contactForm">

        <div className="input-box">
          <span className="input-icon"></span>
          <input
            type="email"
            name="user_email"
            id="user_email"
            placeholder="Tu correo electrónico"
            required
          />
        </div>

        <div className="input-box">
          <span className="input-icon"></span>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Asunto del mensaje"
            required
          />
        </div>

        <div className="input-box">
          <span className="input-icon icon-top"></span>
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Escribe aquí tu mensaje..."
            required
          ></textarea>
        </div>

        <div className="contact-buttons">
          <button
            type="submit"
            className="btn-enviar"
            onClick={() => {
              setToastVisible(true);
              setTimeout(() => setToastVisible(false), 2600);
            }}
          >
            Enviar mensaje
          </button>

          <button type="reset" className="btn-reset">
            Borrar
          </button>
        </div>
      </form>

      <div className="contact-info-pro">
        <h3>Información adicional</h3>
        <p><strong>Dirección:</strong> Santiago, Chile</p>
        <p><strong>Teléfono:</strong> +56 9 1234 5678</p>
        <p><strong>Horario:</strong> Lunes a Viernes — 9:00 a 18:00</p>
        <p><strong>Soporte:</strong> soporte@microplai.cl</p>
      </div>

    </main>
  );
}

export default Contacto;
