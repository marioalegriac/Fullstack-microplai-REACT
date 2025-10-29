import { render, screen } from "@testing-library/react";
import About from "../src/pages/About";
import { describe, test, expect } from "vitest";

describe("Componente About", () => {
  test("renderiza el título principal correctamente", () => {
    render(<About />);
    const titulo = screen.getByRole("heading", { name: /¿Quiénes somos\?/i });
    expect(titulo).toBeInTheDocument();
  });

  test("contiene varios párrafos con información", () => {
    render(<About />);
    const parrafos = screen.getAllByText(/nuestra/i);
    expect(parrafos.length).toBeGreaterThan(1);
  });

  test("la sección principal tiene la clase 'quienes-somos'", () => {
    render(<About />);
    const section = screen.getByRole("region", { name: /¿Quiénes somos\?/i });
    expect(section).toHaveClass("quienes-somos");
  });
});
