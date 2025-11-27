package com.example.Login_Registro.model;

import lombok.Data;

@Data
public class RegistroRequest {
    private String nombre;
    private String apellido;
    private String correo;
    private String contrasena;
    private String rol;
}