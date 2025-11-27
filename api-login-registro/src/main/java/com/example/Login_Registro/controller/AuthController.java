package com.example.Login_Registro.controller;

import com.example.Login_Registro.model.*;
import com.example.Login_Registro.service.AuthService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public Mono<AuthResponse> registrar(@RequestBody RegistroRequest request) {
        return authService.registrar(request);
    }

    @PostMapping("/login")
    public Mono<AuthResponse> login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/usuarios")
    public Flux<Usuario> listarUsuarios(@RequestParam(required = false) String rol) {
        if (rol != null) {
            return authService.listarUsuariosPorRol(rol);
        }
        return authService.listarUsuarios();
    }

    @GetMapping("/usuarios/{id}")
    public Mono<Usuario> obtenerUsuarioPorId(@PathVariable Integer id) {
        return authService.obtenerUsuarioPorId(id);
    }

    @PutMapping("/usuarios/{id}")
    public Mono<AuthResponse> actualizarUsuario(
            @PathVariable Integer id,
            @RequestBody UsuarioUpdateRequest request) {
        return authService.actualizarUsuario(id, request);
    }

    @DeleteMapping("/usuarios/{id}")
    public Mono<AuthResponse> eliminarUsuario(@PathVariable Integer id) {
        return authService.eliminarUsuario(id);
    }
}
