package com.example.carrito.dto;

import lombok.Data;

@Data
public class CompraItemDTO {
    private String productoNombre;
    private String consola;
    private int cantidad;
    private int precio;
}