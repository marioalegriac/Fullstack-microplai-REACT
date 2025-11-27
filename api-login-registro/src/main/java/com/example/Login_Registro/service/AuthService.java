package com.example.Login_Registro.service;

import com.example.Login_Registro.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.example.Login_Registro.exception.*;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final WebClient webClient;

    private static final String TABLA = "/usuarios";

    // ===========================================================
    // REGISTRO — FIX: Supabase devuelve ARRAY, no un objeto
    // ===========================================================
        public Mono<AuthResponse> registrar(RegistroRequest request) {

        if (request.getRol() == null)
                request.setRol("USUARIO");

        return webClient.post()
                .uri(TABLA)
                .bodyValue(request)
                .retrieve()
                // 🔥 Interceptar errores de Supabase
                .onStatus(status -> status.value() == 409, response ->
                        Mono.error(new EmailDuplicadoException("correo_duplicado"))
                )

                .onStatus(status -> status.is4xxClientError() && status.value() != 409, response ->
                        response.bodyToMono(String.class)
                                .flatMap(body -> Mono.error(new RuntimeException("error_4xx_generic")))
                )
                .bodyToFlux(Usuario.class)
                .next()
                .map(u -> new AuthResponse(
                        "Usuario registrado correctamente",
                        u.getId(),
                        u.getNombre(),
                        u.getApellido(),
                        u.getCorreo(),
                        u.getRol()
                ));
        }

    // ===========================================================
    // LOGIN
    // ===========================================================
        public Mono<AuthResponse> login(LoginRequest request) {

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(TABLA)
                        .queryParam("correo", "eq." + request.getCorreo())
                        .queryParam("contrasena", "eq." + request.getContrasena())
                        .queryParam("select", "*")
                        .build())
                .retrieve()

                // ✅ MANEJO REAL DE ERRORES HTTP
                .onStatus(status -> status.isError(), response ->
                        response.bodyToMono(String.class)
                                .flatMap(body -> Mono.error(new RuntimeException(body)))
                )

                .bodyToFlux(Usuario.class)
                .collectList()
                .map(lista -> {
                        AuthResponse resp = new AuthResponse();

                        if (lista.isEmpty()) {
                        resp.setMessage("Usuario o contraseña incorrectos");
                        return resp;
                        }

                        Usuario u = lista.get(0);

                        resp.setMessage("Login exitoso");
                        resp.setId(u.getId());
                        resp.setNombre(u.getNombre());
                        resp.setApellido(u.getApellido());
                        resp.setCorreo(u.getCorreo());
                        resp.setRol(u.getRol());

                        return resp;
                });
        }

    // ===========================================================
    // LISTAR USUARIOS
    // ===========================================================
    public Flux<Usuario> listarUsuarios() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(TABLA)
                        .queryParam("select", "*")
                        .build())
                .retrieve()
                .bodyToFlux(Usuario.class);
    }

    public Flux<Usuario> listarUsuariosPorRol(String rol) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(TABLA)
                        .queryParam("rol", "eq." + rol)
                        .queryParam("select", "*")
                        .build())
                .retrieve()
                .bodyToFlux(Usuario.class);
    }

    // ===========================================================
    // OBTENER POR ID
    // ===========================================================
    public Mono<Usuario> obtenerUsuarioPorId(Integer id) {

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(TABLA)
                        .queryParam("id", "eq." + id)
                        .queryParam("select", "*")
                        .build())
                .retrieve()
                .bodyToFlux(Usuario.class)
                .next();
    }

    // ===========================================================
    // ACTUALIZAR USUARIO
    // ===========================================================
    public Mono<AuthResponse> actualizarUsuario(Integer id, UsuarioUpdateRequest request) {

        Map<String, Object> body = new HashMap<>();

        if (request.getNombre() != null && !request.getNombre().isBlank())
            body.put("nombre", request.getNombre());

        if (request.getApellido() != null && !request.getApellido().isBlank())
            body.put("apellido", request.getApellido());

        if (request.getCorreo() != null && !request.getCorreo().isBlank())
            body.put("correo", request.getCorreo().toLowerCase());

        if (request.getRol() != null && !request.getRol().isBlank())
            body.put("rol", request.getRol().toUpperCase());

        if (request.getContrasena() != null && !request.getContrasena().isBlank())
            body.put("contrasena", request.getContrasena());

        return webClient.patch()
                .uri(uriBuilder -> uriBuilder
                        .path(TABLA)
                        .queryParam("id", "eq." + id)
                        .build())
                .bodyValue(body)
                .retrieve()
                .bodyToFlux(Usuario.class)
                .next()
                .map(u -> new AuthResponse(
                        "Usuario actualizado correctamente",
                        u.getId(),
                        u.getNombre(),
                        u.getApellido(),
                        u.getCorreo(),
                        u.getRol()
                ))
                .onErrorResume(err -> Mono.just(
                        new AuthResponse("Error actualizando usuario",
                                null, null, null, null, null)
                ));
    }

    // ===========================================================
    // ELIMINAR USUARIO — FIX: no intentar parsear JSON vacío
    // ===========================================================
    public Mono<AuthResponse> eliminarUsuario(Integer id) {

        return webClient.delete()
                .uri(uriBuilder -> uriBuilder
                        .path(TABLA)
                        .queryParam("id", "eq." + id)
                        .build())
                .retrieve()
                .bodyToMono(Void.class)   // ← Supabase devuelve VACÍO
                .then(Mono.just(new AuthResponse(
                        "Usuario eliminado correctamente",
                        null, null, null, null, null
                )));
    }
}
