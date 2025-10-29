import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/pages/Login.jsx";
import * as funciones from "../src/funciones/funciones.js";
import { describe, beforeEach, expect, test, vi } from "vitest";


// Mock de navigate de react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock de validarLogin
vi.mock("../src/funciones/funciones.js", () => ({
  validarLogin: vi.fn(),
}));

describe("Componente Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("renderiza los elementos del formulario correctamente", () => {
    render(
      <MemoryRouter>
        <Login setUsuario={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
  });

  test("actualiza los campos al escribir", () => {
    render(
      <MemoryRouter>
        <Login setUsuario={vi.fn()} />
      </MemoryRouter>
    );

    const correoInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    fireEvent.change(correoInput, { target: { value: "admin@correo.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });

    expect(correoInput.value).toBe("admin@correo.com");
    expect(passwordInput.value).toBe("12345");
  });

  test("llama a validarLogin al enviar el formulario", async () => {
    const mockSetUsuario = vi.fn();
    funciones.validarLogin.mockResolvedValue(true);

    // Simulamos usuario admin en localStorage
    localStorage.setItem(
      "usuario",
      JSON.stringify({ nombre: "Admin", tipo: "admin" })
    );

    render(
      <MemoryRouter>
        <Login setUsuario={mockSetUsuario} />
      </MemoryRouter>
    );

    const correoInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    fireEvent.change(correoInput, { target: { value: "admin@correo.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(funciones.validarLogin).toHaveBeenCalledWith(
        "admin@correo.com",
        "12345",
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    });

    await waitFor(() => {
      expect(mockSetUsuario).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/Administrador");
    });
  });
});
