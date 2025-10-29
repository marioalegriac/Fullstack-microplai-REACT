import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Xbox from "../src/pages/Xbox";
import * as funciones from "../src/funciones/funciones.js";
import { describe, test, beforeEach, vi, expect } from "vitest";


vi.mock("../src/funciones/funciones.js", () => ({
  agregarAlCarrito: vi.fn(),
}));

describe("Componente Xbox", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renderiza correctamente el título y el catálogo", () => {
    render(
      <MemoryRouter>
        <Xbox />
      </MemoryRouter>
    );

    const xboxTextos =
      screen.queryAllByText(/xbox/i).length > 0 ||
      screen.queryAllByAltText(/xbox/i).length > 0;
    expect(xboxTextos).toBeTruthy();
    expect(screen.getByText(/Catálogo Xbox/i)).toBeInTheDocument();


    const juegos = screen.getAllByRole("button", { name: /agregar al carrito/i });
    expect(juegos.length).toBeGreaterThan(8); 
  });

  test("renderiza el iframe del video de presentación", () => {
    render(
      <MemoryRouter>
        <Xbox />
      </MemoryRouter>
    );

    const iframe = screen.getByTitle("Presentación Xbox Series X");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", expect.stringContaining("youtube.com"));
  });

  test("cada juego tiene imagen, nombre, consola, precio y botón", () => {
    render(
      <MemoryRouter>
        <Xbox />
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
        <Xbox />
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
