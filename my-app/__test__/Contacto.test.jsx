import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Contacto from '../src/pages/Contacto'
import { vi } from 'vitest'

// Mock de emailjs
vi.mock('@emailjs/browser', () => {
  const send = vi.fn(() => Promise.resolve())
  const init = vi.fn()
  return {
    __esModule: true,
    default: { send, init },
    send,
    init,
  }
})
 
test('envía el formulario correctamente y muestra el alert', async () => {
  const emailjs = await import('@emailjs/browser')

  // Mock del alert del navegador
  vi.spyOn(window, 'alert').mockImplementation(() => {})

  render(<Contacto />)

  // Rellenamos los inputs simulando la interacción del usuario
  const emailInput = screen.getByLabelText(/Correo electrónico/i)
  const subjectInput = screen.getByLabelText(/Asunto/i)
  const messageInput = screen.getByLabelText(/Mensaje/i)

  fireEvent.change(emailInput, { target: { value: 'test@correo.com' } })
  fireEvent.change(subjectInput, { target: { value: 'Consulta de prueba' } })
  fireEvent.change(messageInput, { target: { value: 'Mensaje de prueba' } })

  // Obtenemos el formulario desde el DOM
  const form = document.getElementById('contactForm')
  expect(form).toBeTruthy()

  // Creamos un evento submit con target simulado
  const fakeEvent = {
    preventDefault: vi.fn(),
    target: {
      user_email: emailInput,
      subject: subjectInput,
      message: messageInput,
    },
  }

  form.onsubmit = (e) => e.preventDefault() 
  form.dispatchEvent(new Event('submit', { bubbles: true }))

  const handleSubmit = form.onsubmit || form._reactInternals?.return?.pendingProps?.onSubmit
  if (handleSubmit) handleSubmit(fakeEvent)

  await waitFor(() => {
    expect(emailjs.send).toHaveBeenCalledWith(
      'service_2wpcqd9',
      'template_nsebgim',
      expect.objectContaining({
        userEmail: 'test@correo.com',
        subject: 'Consulta de prueba',
        message: expect.stringContaining('Mensaje de prueba'),
      })
    )
  })

  expect(window.alert).toHaveBeenCalledWith('Correo enviado con éxito al usuario')
})
