package com.proyectodawii.Proyect_dawii_backend.controller;

import com.proyectodawii.Proyect_dawii_backend.dto.LoginDTO;
import com.proyectodawii.Proyect_dawii_backend.dto.RegistroUsuarioDTO;
import com.proyectodawii.Proyect_dawii_backend.model.Usuario;


import com.proyectodawii.Proyect_dawii_backend.security.JwtUtil;
import com.proyectodawii.Proyect_dawii_backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UsuarioService servicio;



    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody RegistroUsuarioDTO dto) {
        try {
            Usuario nuevo = servicio.registrarUsuario(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        try {
            Usuario usuario = servicio.login(dto);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}