import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contacto from '../src/pages/Contacto';
import { test, expect, vi } from 'vitest';


vi.mock('@emailjs/browser', () => {
  const send = vi.fn(() => Promise.resolve());
  const init = vi.fn();
  return {
    __esModule: true,
    default: { send, init },
    send,
    init,
  };
});

test('envía el formulario correctamente y muestra el alert', async () => {
  const { default: emailjs } = await import('@emailjs/browser');

  vi.spyOn(window, 'alert').mockImplementation(() => {});

  render(<Contacto />);


  fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@correo.com' } });
  fireEvent.change(screen.getByLabelText(/Asunto/i), { target: { value: 'Consulta de prueba' } });
  fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Mensaje de prueba' } });

  const form = screen.getByTestId('contact-form');
  expect(form).toBeTruthy();


  fireEvent.submit(form);

  await waitFor(() => {
    expect(emailjs.send).toHaveBeenCalledWith(
      'service_2wpcqd9',
      'template_nsebgim',
      expect.objectContaining({
        userEmail: 'test@correo.com',
        subject: 'Consulta de prueba',
        message: expect.stringContaining('Mensaje de prueba'),
      })
    );
  });

  expect(window.alert).toHaveBeenCalledWith('Correo enviado con éxito al usuario');
});
