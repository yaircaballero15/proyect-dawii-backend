package com.proyectodawii.Proyect_dawii_backend.controller;

import com.proyectodawii.Proyect_dawii_backend.dto.RegistroUsuarioDTO;
import com.proyectodawii.Proyect_dawii_backend.dto.UserDto;
import com.proyectodawii.Proyect_dawii_backend.model.Usuario;
import com.proyectodawii.Proyect_dawii_backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UsuarioService usuarioService;

    // === ENDPOINTS SOLO ADMIN ===

    /** Listar todos los usuarios */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserDto> listarTodos() {
        return usuarioService.listarTodos();
    }

    /** Obtener un usuario por ID */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> obtener(@PathVariable Long id) {
        Optional<UserDto> userOpt = usuarioService.obtener(id);
        return userOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** Actualizar usuario (solo admin) */
   // @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> actualizar(@PathVariable Long id, @RequestBody RegistroUsuarioDTO dto) {
        Optional<UserDto> updated = usuarioService.actualizar(id, dto);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** Eliminar usuario (solo admin) */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = usuarioService.eliminar(id);
        return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // === ENDPOINTS CLIENTE AUTENTICADO ===

    /** Ver mi perfil (cliente autenticado) */
    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/me")
    public UserDto miPerfil(@AuthenticationPrincipal Usuario usuario) {
        return usuarioService.mapToDTO(usuario);
    }

    /** Actualizar mi perfil (cliente autenticado) */
    @PreAuthorize("hasRole('CLIENTE')")
    @PutMapping("/me")
    public ResponseEntity<UserDto> actualizarMiPerfil(
            @AuthenticationPrincipal Usuario usuario,
            @RequestBody RegistroUsuarioDTO dto) {
        Optional<UserDto> updated = usuarioService.actualizar(usuario.getCodUsua(), dto);
        return updated.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
