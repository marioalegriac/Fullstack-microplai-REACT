import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

function Contacto() {
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    emailjs.init("lWDqvGY4Fj9noKYtz");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const templateParams = {
      userEmail: form.get("user_email"),
      subject: form.get("subject"),
      message:
        form.get("message") ||
        `Hemos recibido su solicitud correctamente.
        Nuestro equipo está revisando su caso y nos pondremos en contacto a la brevedad.
        Saludos cordiales, Microplai.`,
    };

    emailjs
      .send("service_2wpcqd9", "template_nsebgim", templateParams)
      .then(() => {
        setToastVisible(true);

        setTimeout(() => {
          setToastVisible(false);
        }, 2600);

        e.target.reset();
      })
      .catch((error) => {
        alert("Error al enviar: " + JSON.stringify(error));
      });
  };

  return (
    <main className="contact-pro">

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

      <form className="contact-form-pro" onSubmit={handleSubmit}>
        
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
          <button type="submit" className="btn-enviar">
            Enviar mensaje
          </button>

          <button type="reset" className="btn-reset">
            Borrar
          </button>
        </div>
      </form>

      <div className="contact-info-pro">
        <h3>Información adicional</h3>
        <p><strong> Dirección:</strong> Santiago, Chile</p>
        <p><strong> Teléfono:</strong> +56 9 1234 5678</p>
        <p><strong> Horario:</strong> Lunes a Viernes — 9:00 a 18:00</p>
        <p><strong> Soporte:</strong> soporte@microplai.cl</p>
      </div>
    </main>
  );
}

export default Contacto;
