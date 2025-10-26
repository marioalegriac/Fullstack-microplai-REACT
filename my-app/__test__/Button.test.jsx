import { render, screen } from '@testing-library/react'
import Button from '../src/components/Button'
import { test, expect } from "vitest";



test('muestra el texto del botón correctamente', () => {
    render(<Button label="Presionar" />)
    expect(screen.getByText('Presionar')).toBeInTheDocument()
})