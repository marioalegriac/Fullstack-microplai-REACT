import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Play from "../src/pages/Play.jsx";
import * as funciones from "../src/funciones/funciones.js";
import { describe, vi, test, beforeEach, expect } from "vitest";

// Mock de la función agregarAlCarrito
vi.mock("../src/funciones/funciones.js", () => ({
  agregarAlCarrito: vi.fn(),
}));

describe("Componente Play", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renderiza correctamente el título y el catálogo", () => {
    render(
      <MemoryRouter>
        <Play />
      </MemoryRouter>
    );

    const ps5Textos =
      screen.queryAllByText(/ps5/i).length > 0 ||
      screen.queryAllByAltText(/ps5/i).length > 0;
    expect(ps5Textos).toBeTruthy();
    expect(screen.getByText(/Catálogo PlayStation/i)).toBeInTheDocument();

    // Verifica que haya varios juegos en pantalla
    const juegos = screen.getAllByRole("button", { name: /agregar al carrito/i });
    expect(juegos.length).toBeGreaterThan(5);
  });

  test("renderiza el iframe del video de presentación", () => {
    render(
      <MemoryRouter>
        <Play />
      </MemoryRouter>
    );

    const iframe = screen.getByTitle("Presentacion PS5");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", expect.stringContaining("youtube.com"));
  });

  test("cada juego tiene imagen, nombre, consola, precio y botón", () => {
    render(
      <MemoryRouter>
        <Play />
      </MemoryRouter>
    );

    const imagenes = screen.getAllByRole("img");
    expect(imagenes.length).toBeGreaterThan(5);

    const precios = screen.getAllByText(/\$/);
    expect(precios.length).toBeGreaterThan(5);

    const botones = screen.getAllByRole("button", { name: /agregar al carrito/i });
    expect(botones.length).toBeGreaterThan(5);
  });

  test("llama a agregarAlCarrito al presionar un botón", () => {
    render(
      <MemoryRouter>
        <Play />
      </MemoryRouter>
    );

    const boton = screen.getAllByRole("button", { name: /agregar al carrito/i })[0];
    fireEvent.click(boton);

    expect(funciones.agregarAlCarrito).toHaveBeenCalledTimes(1);
    expect(funciones.agregarAlCarrito).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Number),
        nombre: expect.any(String),
        precio: expect.any(Number),
      }),
      expect.any(Function),
      expect.any(Function)
    );
  });
});
