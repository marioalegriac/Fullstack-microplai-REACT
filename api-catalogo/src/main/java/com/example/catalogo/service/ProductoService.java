package com.example.catalogo.service;

import com.example.catalogo.model.Producto;
import com.example.catalogo.model.ProductoCreateDTO;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final WebClient webClient;


    public Flux<Producto> obtenerTodos() {
        return webClient.get()
                .uri("/productos?select=*")
                .retrieve()
                .bodyToFlux(Producto.class);
    }

    public Mono<Producto> obtenerPorId(int id) {
        return webClient.get()
                .uri("/productos?select=*&id=eq." + id)
                .retrieve()
                .bodyToFlux(Producto.class)
                .next();
    }


    public Mono<Producto> crearProducto(ProductoCreateDTO dto) {
        return webClient.post()
                .uri("/productos")
                .bodyValue(dto)
                .retrieve()
                .bodyToFlux(Producto.class)
                .collectList()
                .map(lista -> lista.get(0));
    }


    public Mono<Producto> actualizarProducto(int id, Producto producto) {

        Map<String, Object> updates = new HashMap<>();

        if (producto.getNombre() != null) updates.put("nombre", producto.getNombre());
        if (producto.getConsola() != null) updates.put("consola", producto.getConsola());
        if (producto.getDescripcion() != null) updates.put("descripcion", producto.getDescripcion());
        if (producto.getVideo() != null) updates.put("video", producto.getVideo());
        if (producto.getPrecio() != null) updates.put("precio", producto.getPrecio());
        if (producto.getImagen() != null) updates.put("imagen", producto.getImagen());

        return webClient.patch()
                .uri("/productos?id=eq." + id)
                .bodyValue(updates)
                .retrieve()
                .bodyToFlux(Producto.class)
                .next();
    }


    public Mono<Void> eliminarProducto(int id) {
        return webClient.delete()
                .uri("/productos?id=eq." + id)
                .retrieve()
                .bodyToMono(Void.class);
    }
}
