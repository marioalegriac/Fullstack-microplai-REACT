import { render, screen, fireEvent } from "@testing-library/react";
import Carrito from "../src/pages/Carrito";
import React from "react";
import { describe, beforeEach, afterEach, test, expect } from "vitest";

describe("🛒 Componente Carrito", () => {
  beforeEach(() => {

    localStorage.setItem(
      "carrito",
      JSON.stringify([
        {
          id: 1,
          nombre: "Metal Gear Solid V: The Phantom Pain",
          consola: "PS5",
          precio: 74990,
          cantidad: 1,
          imagen: "public/images/play/Metal gear solid Snake eater PS5.png",
        },
      ])
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("Renderiza correctamente los datos del producto", () => {
    render(<Carrito />);


    expect(
      screen.getByText("Metal Gear Solid V: The Phantom Pain")
    ).toBeInTheDocument();

    expect(screen.getByText("PS5")).toBeInTheDocument();

    const precioRegex = /(74[.,\s]?990\s?CLP|CLP\s?74[.,\s]?990)/i;
    expect(screen.getByText(precioRegex)).toBeInTheDocument();


    expect(screen.getByText(/Total:/)).toBeInTheDocument();
  });

  test("Muestra el mensaje al vaciar el carrito", () => {
    render(<Carrito />);

    const btnVaciar = screen.getByText("Vaciar Carrito");
    fireEvent.click(btnVaciar);

    expect(screen.getByText("🛒 Carrito vaciado")).toBeInTheDocument();
    expect(localStorage.getItem("carrito")).toBeNull();
  });

  test("Muestra el formulario al presionar 'Pagar'", () => {
    render(<Carrito />);

    const btnPagar = screen.getByText("Pagar");
    fireEvent.click(btnPagar);

    expect(screen.getByText("🧾 Datos de envío")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
  });

  test("Cierra el formulario al presionar 'Cerrar formulario'", () => {
    render(<Carrito />);

    const btnPagar = screen.getByText("Pagar");
    fireEvent.click(btnPagar);

    const btnCerrar = screen.getByText("Cerrar formulario");
    fireEvent.click(btnCerrar);


    expect(screen.queryByText("🧾 Datos de envío")).toBeNull();
  });
});
