import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { describe, beforeEach, test, expect } from "vitest";

// 🧩 Mock del módulo SupaBaseCliente (evita el error de importación)
vi.mock("../src/SupaBaseCliente", () => ({
  supabase: {},
}));

// 🧩 Mock de las funciones usadas por el componente
vi.mock("../src/funciones/funciones.js", () => ({
  moverCarrusel: vi.fn(),
  agregarAlCarrito: vi.fn(),
}));

import Home from "../src/pages/Home";
import { moverCarrusel, agregarAlCarrito } from "../src/funciones/funciones.js";

describe("Componente Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renderiza correctamente un producto destacado", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica que se renderiza un producto específico
    expect(
      screen.getByText("Metal Gear Solid V: The Phantom Pain")
    ).toBeInTheDocument();
    const ps5Textos =
      screen.queryAllByText(/ps5/i).length > 0 ||
      screen.queryAllByAltText(/ps5/i).length > 0;
    expect(ps5Textos).toBeTruthy();
    expect(screen.getByText(/\$74\.?990/)).toBeInTheDocument();
  });

  test("llama a moverCarrusel al presionar los botones del carrusel", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const botonPrev = screen.getByRole("button", { name: "❮" });
    const botonNext = screen.getByRole("button", { name: "❯" });

    fireEvent.click(botonPrev);
    fireEvent.click(botonNext);

    expect(moverCarrusel).toHaveBeenCalledTimes(2);
  });

  test("llama a agregarAlCarrito al hacer clic en un botón 'Agregar al carrito'", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const boton = screen.getAllByText("Agregar al carrito")[0];
    fireEvent.click(boton);

    expect(agregarAlCarrito).toHaveBeenCalledTimes(1);
  });
});
