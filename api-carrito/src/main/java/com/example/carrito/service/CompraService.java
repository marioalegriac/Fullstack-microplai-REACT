package com.example.carrito.service;

import com.example.carrito.dto.CompraItemDTO;
import com.example.carrito.dto.CompraRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CompraService {

private final WebClient supabaseClient;
private final String supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsZ2x1d2RxdmVuY3dwZ3pkb3dyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTYwMDA1NywiZXhwIjoyMDc3MTc2MDU3fQ.kbstg8nwLBb8gV3qHe5NRbY1r-F1GoA0E91IXS31cLg";

public CompraService(WebClient supabaseClient) {
    this.supabaseClient = supabaseClient;
}

public Map<String, Object> crearCompra(CompraRequest request) {
    try {
        // Payload de la compra
        Map<String, Object> compraPayload = new HashMap<>();
        compraPayload.put("usuario_id", request.getUsuarioId());
        compraPayload.put("nombre", request.getNombre());
        compraPayload.put("apellido", request.getApellido());
        compraPayload.put("correo", request.getCorreo());
        compraPayload.put("total", request.getTotal());
        compraPayload.put("fecha", OffsetDateTime.now().toString());
        compraPayload.put("estado", "PENDIENTE");
        compraPayload.put("direccion", request.getDireccion());
        compraPayload.put("indicaciones", request.getIndicaciones());

        // Crear la compra en Supabase y obtener el primer elemento del array
        @SuppressWarnings("unchecked")
        Map<String, Object>[] createdCompraArr = supabaseClient.post()
                .uri("/compras")
                .header("apikey", supabaseKey)
                .header("Authorization", "Bearer " + supabaseKey)
                .header("Prefer", "return=representation")
                .bodyValue(compraPayload)
                .retrieve()
                .bodyToMono(Map[].class)
                .block();

        if (createdCompraArr == null || createdCompraArr.length == 0) {
            throw new RuntimeException("No se pudo crear la compra");
        }

        Map<String, Object> createdCompra = createdCompraArr[0];
        Integer compraId = ((Number) createdCompra.get("id")).intValue();

        // Payload de los detalles de compra
        List<Map<String, Object>> detallesPayload = request.getItems().stream().map(item -> {
            Map<String, Object> d = new HashMap<>();
            d.put("compra_id", compraId);
            d.put("producto_nombre", item.getProductoNombre());
            d.put("consola", item.getConsola());
            d.put("cantidad", item.getCantidad());
            d.put("precio", item.getPrecio());
            return d;
        }).collect(Collectors.toList());

        // Insertar detalles
        if (!detallesPayload.isEmpty()) {
            try {
                supabaseClient.post()
                        .uri("/compra_detalle")
                        .header("apikey", supabaseKey)
                        .header("Authorization", "Bearer " + supabaseKey)
                        .header("Prefer", "return=representation")
                        .bodyValue(detallesPayload)
                        .retrieve()
                        .bodyToMono(Void.class)
                        .block();
            } catch (Exception e) {
                // Rollback: eliminar compra si falla la inserción de detalles
                supabaseClient.delete()
                        .uri("/compras?id=eq." + compraId)
                        .header("apikey", supabaseKey)
                        .header("Authorization", "Bearer " + supabaseKey)
                        .retrieve()
                        .bodyToMono(Void.class)
                        .block();
                throw new RuntimeException("Error al insertar items. Se hizo rollback", e);
            }
        }

        return createdCompra;

    } catch (Exception finalError) {
        throw new RuntimeException("Error al crear la compra: " + finalError.getMessage(), finalError);
    }
}

    public List<Map<String, Object>> listarCompras() {

        // 1️⃣ Obtener TODAS las compras
        @SuppressWarnings("unchecked")
        Map<String, Object>[] comprasArr = supabaseClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/compras")
                        .queryParam("select", "*")
                        .build())
                .header("apikey", supabaseKey)
                .header("Authorization", "Bearer " + supabaseKey)
                .retrieve()
                .bodyToMono(Map[].class)
                .block();

        if (comprasArr == null) return Collections.emptyList();

        List<Map<String, Object>> compras = Arrays.asList(comprasArr);

        // 2️⃣ Agregar productos de cada compra
        for (Map<String, Object> compra : compras) {

            Integer compraId = ((Number) compra.get("id")).intValue();

            @SuppressWarnings("unchecked")
            Map<String, Object>[] detallesArr = supabaseClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/compra_detalle")
                            .queryParam("compra_id", "eq." + compraId)
                            .queryParam("select", "*")
                            .build())
                    .header("apikey", supabaseKey)
                    .header("Authorization", "Bearer " + supabaseKey)
                    .retrieve()
                    .bodyToMono(Map[].class)
                    .block();

            List<Map<String, Object>> detalles = detallesArr == null
                    ? Collections.emptyList()
                    : Arrays.asList(detallesArr);

            // 3️⃣ Agregar campo "productos" al JSON final
            compra.put("productos", detalles);
        }

        return compras;
    }


public Map<String, Object> obtenerCompraPorId(Integer id) {
    @SuppressWarnings("unchecked")
    Map<String, Object>[] compras = supabaseClient.get()
            .uri(uriBuilder -> uriBuilder.path("/compras").queryParam("id", "eq." + id).queryParam("select", "*").build())
            .header("apikey", supabaseKey)
            .header("Authorization", "Bearer " + supabaseKey)
            .retrieve()
            .bodyToMono(Map[].class)
            .block();

    if (compras == null || compras.length == 0) return null;

    Map<String, Object> compra = compras[0];

    @SuppressWarnings("unchecked")
    Map<String, Object>[] detalles = supabaseClient.get()
            .uri(uriBuilder -> uriBuilder.path("/compra_detalle").queryParam("compra_id", "eq." + id).queryParam("select", "*").build())
            .header("apikey", supabaseKey)
            .header("Authorization", "Bearer " + supabaseKey)
            .retrieve()
            .bodyToMono(Map[].class)
            .block();

    compra.put("detalles", detalles == null ? Collections.emptyList() : Arrays.asList(detalles));
    return compra;
}

public Map<String, Object> actualizarCompra(Integer id, Map<String, Object> updates) {
    @SuppressWarnings("unchecked")
    Map<String, Object>[] resp = supabaseClient.patch()
            .uri(uriBuilder -> uriBuilder.path("/compras").queryParam("id", "eq." + id).queryParam("select", "*").build())
            .header("apikey", supabaseKey)
            .header("Authorization", "Bearer " + supabaseKey)
            .bodyValue(updates)
            .retrieve()
            .bodyToMono(Map[].class)
            .block();

    if (resp == null || resp.length == 0) {
        throw new RuntimeException("No se pudo actualizar la compra con id " + id);
    }
    return resp[0];
}

public void eliminarCompra(Integer id) {
    supabaseClient.delete()
            .uri(uriBuilder -> uriBuilder.path("/compra_detalle").queryParam("compra_id", "eq." + id).build())
            .header("apikey", supabaseKey)
            .header("Authorization", "Bearer " + supabaseKey)
            .retrieve()
            .bodyToMono(Void.class)
            .block();

    supabaseClient.delete()
            .uri(uriBuilder -> uriBuilder.path("/compras").queryParam("id", "eq." + id).build())
            .header("apikey", supabaseKey)
            .header("Authorization", "Bearer " + supabaseKey)
            .retrieve()
            .bodyToMono(Void.class)
            .block();
}

}