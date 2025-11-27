package com.example.catalogo.controller;

import com.example.catalogo.model.Producto;
import com.example.catalogo.model.ProductoCreateDTO;
import com.example.catalogo.model.ProductoDestacadoDTO;
import com.example.catalogo.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductoController {

    private final ProductoService service;

    @GetMapping
    public Flux<Producto> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Mono<Producto> obtenerPorId(@PathVariable Integer id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public Mono<Producto> crear(@RequestBody ProductoCreateDTO dto) {
        return service.crearProducto(dto);
    }

    @PatchMapping("/{id}")
    public Mono<Producto> actualizar(@PathVariable Integer id, @RequestBody Producto producto) {
        return service.actualizarProducto(id, producto);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> eliminar(@PathVariable Integer id) {
        return service.eliminarProducto(id);
    }

    @GetMapping("/carrusel")
    public Flux<ProductoDestacadoDTO> obtenerCarrusel() {

        Integer[] idsCarrusel = {1, 19, 24, 46, 15, 6, 49, 26, 44, 5};

        return Flux.fromArray(idsCarrusel)
                .flatMap(id ->
                        service.obtenerPorId(id)
                               .map(p -> new ProductoDestacadoDTO(
                                       p.getId(),
                                       p.getNombre(),
                                       p.getImagen(),
                                       p.getPrecio(),
                                       p.getConsola()
                               ))
                               .onErrorResume(e -> Mono.empty())
                );
    }
}
