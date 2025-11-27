package com.example.catalogo.model;

import lombok.Data;

@Data
public class Producto {
    private Integer id;
    private String nombre;
    private String consola;
    private String descripcion;
    private String video;
    private Integer precio;
    private String imagen;
}