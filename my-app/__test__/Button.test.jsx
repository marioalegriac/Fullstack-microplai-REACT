import { render, screen } from '@testing-library/react'
import {test, expect } from 'vitest'
import Button from '../src/components/Button'


test('muestra el texto del botón correctamente', () => {
render(<Button label="Presionar" />)
expect(screen.getByText('Presionar')).toBeInTheDocument()
})