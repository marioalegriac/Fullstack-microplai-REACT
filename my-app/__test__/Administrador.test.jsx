import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Administrador from "../src/pages/Administrador";
import * as funciones from "../src/funciones/funciones.js";
import { vi, test, describe, beforeEach, expect } from "vitest";

// --- Mock de las funciones importadas ---
vi.mock("../src/funciones/funciones.js", () => ({
  cargarUsuarios: vi.fn(),
  cargarAdmins: vi.fn(),
  cargarOrdenes: vi.fn(),
  agregarAdministrador: vi.fn(),
  eliminarUsuario: vi.fn(),
  generarReporte: vi.fn(),
}));

describe("Administrador Component", () => {
  beforeEach(() => {
    funciones.cargarUsuarios.mockResolvedValue([
      { id: 1, nombre: "Juan", apellido: "Pérez", correo: "juan@test.com" },
    ]);
    funciones.cargarAdmins.mockResolvedValue([
      { id: 99, nombre: "Admin", apellido: "Root", correo: "admin@test.com" },
    ]);
    funciones.cargarOrdenes.mockResolvedValue([]);
  });

  test("renderiza correctamente el título principal", async () => {
    render(<Administrador />);

    // Esperar que cargue el título
    expect(await screen.findByText("Panel de Administración")).toBeInTheDocument();
  });

  test("llama a las funciones de carga al iniciar", async () => {
    render(<Administrador />);

    await waitFor(() => {
      expect(funciones.cargarUsuarios).toHaveBeenCalled();
      expect(funciones.cargarAdmins).toHaveBeenCalled();
      expect(funciones.cargarOrdenes).toHaveBeenCalled();
    });
  });

  test("permite agregar un nuevo administrador", async () => {
    render(<Administrador />);

    // Rellenar campos del nuevo admin
    fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Mario" } });
    fireEvent.change(screen.getByPlaceholderText("Apellido"), { target: { value: "Rossi" } });
    fireEvent.change(screen.getByPlaceholderText("Correo"), { target: { value: "mario@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "12345" } });

    // Hacer clic en agregar admin
    fireEvent.click(screen.getByText("Agregar Admin"));

    await waitFor(() => {
      expect(funciones.agregarAdministrador).toHaveBeenCalledWith({
        nombre: "Mario",
        apellido: "Rossi",
        correo: "mario@test.com",
        contrasena: "12345",
      });
    });
  });
});