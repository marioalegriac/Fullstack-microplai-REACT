import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Detalle from "../src/pages/Detalle";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { obtenerInfoJuego } from "../src/funciones/funciones";

// Mock de la función que obtiene los datos del juego
vi.mock("../src/funciones/funciones", () => ({
  obtenerInfoJuego: vi.fn(),
}));
 
// Mock del evento global
vi.stubGlobal("dispatchEvent", vi.fn());

describe("🎮 Detalle.jsx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const juegoMock = {
    id: 1,
    nombre: "Mario Kart",
    precio: 29990,
    descripcion: "Carreras de Mario y amigos",
    imagen: "mario.jpg",
    video: "https://www.youtube.com/embed/xyz123",
  };

  // 🔹 TEST 1: Juego no encontrado
  test("muestra mensaje 'Juego no encontrado' si el juego no existe", () => {
    obtenerInfoJuego.mockReturnValue(undefined); // <- dejamos undefined acá

    render(
      <MemoryRouter initialEntries={["/detalle/1"]}>
        <Routes>
          <Route path="/detalle/:id" element={<Detalle />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/juego no encontrado/i)).toBeInTheDocument();
  });

  // 🔹 TEST 2: Render correcto
  test("renderiza correctamente los datos del juego", () => {
    obtenerInfoJuego.mockReturnValue(juegoMock); // <- persistente, no 'once'

    render(
      <MemoryRouter initialEntries={["/detalle/1"]}>
        <Routes>
          <Route path="/detalle/:id" element={<Detalle />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(juegoMock.nombre)).toBeInTheDocument();
    expect(screen.getByText(/\$29\.990/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /agregar al carrito/i })
    ).toBeInTheDocument();
  });

  // 🔹 TEST 3: Agregar al carrito y mostrar mensaje
  test("agrega el juego al carrito y muestra mensaje temporal", async () => {
    obtenerInfoJuego.mockReturnValue(juegoMock); // <- persistente

    render(
      <MemoryRouter initialEntries={["/detalle/1"]}>
        <Routes>
          <Route path="/detalle/:id" element={<Detalle />} />
        </Routes>
      </MemoryRouter>
    );

    const boton = screen.getByRole("button", { name: /agregar al carrito/i });
    fireEvent.click(boton);

    // Verifica que se haya guardado en localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    expect(carrito).toHaveLength(1);
    expect(carrito[0].nombre).toBe("Mario Kart");

    // Espera el mensaje de éxito (usa waitFor para sincronizar el render)
    await waitFor(
      () => expect(screen.getByText(/añadido al carrito/i)).toBeInTheDocument(),
      { timeout: 1500 }
    );

    // Verifica que desaparece después del timeout
    await waitFor(
      () =>
        expect(
          screen.queryByText(/añadido al carrito/i)
        ).not.toBeInTheDocument(),
      { timeout: 2000 }
    );
  });
});
