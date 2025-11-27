package com.example.Login_Registro.config;

import com.example.Login_Registro.exception.EmailDuplicadoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailDuplicadoException.class)
    public ResponseEntity<?> handleEmailDuplicado(EmailDuplicadoException ex) {
        return ResponseEntity.status(409)
                .body(Map.of("message", "❌ El correo ya está registrado"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneral(Exception ex) {

        ex.printStackTrace();

        return ResponseEntity.status(500)
                .body(Map.of(
                        "message", "❌ Error interno del servidor",
                        "error", ex.getMessage()
                ));
    }
}
