package com.proyectodawii.Proyect_dawii_backend.controller;

import com.proyectodawii.Proyect_dawii_backend.model.Boleto;
import com.proyectodawii.Proyect_dawii_backend.model.Usuario;
import com.proyectodawii.Proyect_dawii_backend.service.BoletoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/boletos")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BoletoController {

    private final BoletoService boletoService;

    /* ========= ENDPOINTS SOLO ADMIN ========= */

    /** Listar todos los boletos */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Boleto> listarTodos() {
        return boletoService.listarTodos();
    }

    /** Obtener un boleto por ID */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Boleto> obtener(@PathVariable Long id) {
        return boletoService.obtener(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** Actualizar asiento o precio */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Boleto> actualizar(@PathVariable Long id,
                                             @RequestBody Boleto data) {
        return boletoService.actualizar(id, data)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /* ========= ENDPOINT COMPARTIDO (ADMIN o CLIENTE dueño) ========= */

    /** Cancelar boleto */
    @PreAuthorize("hasRole('ADMIN') or hasRole('CLIENTE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelar(@PathVariable Long id,
                                         @AuthenticationPrincipal Usuario usuario) {
        return boletoService.cancelarSiAutorizado(id, usuario)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    /* ========= ENDPOINTS SÓLO CLIENTE ========= */

    /** Comprar un boleto */
    @PreAuthorize("hasRole('CLIENTE')")
    @PostMapping
    public ResponseEntity<Boleto> comprar(@RequestBody Boleto payload,
                                          @AuthenticationPrincipal Usuario usuario) {

        payload.setFechaCompra(LocalDateTime.now());
        payload.setUsuario(usuario);                // Asigna el usuario autenticado
        Boleto creado = boletoService.guardar(payload);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    /** Ver boletos propios */
    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/mios")
    public List<Boleto> misBoletos(@AuthenticationPrincipal Usuario usuario) {
        return boletoService.listarPorUsuario(usuario.getCodUsua());
    }
}
