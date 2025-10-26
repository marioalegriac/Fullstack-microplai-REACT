import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";

function Contacto() {
  useEffect(() => {
    emailjs.init("lWDqvGY4Fj9noKYtz");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const templateParams = {
      userEmail: formData.get("user_email"),
      subject: formData.get("subject"),
      message:
        formData.get("message") ||
        `Hemos recibido su solicitud correctamente.
        Nuestro equipo está revisando su caso y nos pondremos en contacto a la brevedad.
        Saludos cordiales, Microplai.`,
    };

    emailjs
      .send("service_2wpcqd9", "template_nsebgim", templateParams)
      .then(() => {
        alert("Correo enviado con éxito al usuario");
        e.target.reset();
      })
      .catch((error) => {
        alert("Error al enviar: " + JSON.stringify(error));
      });
  };

  return (
    <div className="Contacto">
      <section id="contact-form" className="inner form-container">
        <h2>Contáctanos</h2>
        <p>Completa el formulario y te responderemos lo antes posible.</p>

        <form
          id="contactForm"
          data-testid="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="fields">
            <div className="field half">
              <label htmlFor="user_email">Correo electrónico</label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                placeholder="Ingrese su correo..."
                required
              />
            </div>
            <div className="field half">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Asunto..."
                required
              />
            </div>
            <div className="field">
              <label htmlFor="message">Mensaje</label>
              <textarea
                name="message"
                id="message"
                rows={5}
                placeholder="Escribe tu mensaje aquí..."
                required
              />
            </div>
          </div>
          <ul className="actions">
            <li>
              <input type="submit" value="Enviar" className="primary" />
            </li>
            <li>
              <input type="reset" value="Borrar" />
            </li>
          </ul>
        </form>
      </section>
    </div>
  );
}

export default Contacto;
