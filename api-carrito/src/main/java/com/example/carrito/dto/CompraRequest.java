package com.example.carrito.dto;

import lombok.Data;
import java.util.List;

@Data
public class CompraRequest {

    private Integer usuarioId;
    private String nombre;
    private String apellido;
    private String correo;
    private String direccion;
    private String indicaciones;
    private int total;

    private List<CompraItemDTO> items;
}