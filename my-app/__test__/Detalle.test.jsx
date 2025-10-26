import React from "react";
import { render, screen } from '@testing-library/react'
import Detalle from '../src/pages/Detalle'
import { test, expect, vi } from "vitest";



vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
}))

vi.mock('../src/funciones/funciones', () => ({
  obtenerInfoJuego: vi.fn(() => ({
    id: 1,
    nombre: 'God of War Ragnarok',
    precio: 67990,
    descripcion: 'Juego de acción para PS5',
    imagen: 'imagen.jpg',
    video: 'https://youtube.com/trailer'
  })),
}))

test('muestra los detalles del juego correctamente', () => {
  render(<Detalle />)

  expect(screen.getByText('God of War Ragnarok')).toBeInTheDocument()
  expect(screen.getByText('$67.990')).toBeInTheDocument()
  expect(screen.getByText('Agregar al carrito')).toBeInTheDocument()
})
