package com.proyectodawii.Proyect_dawii_backend.controller;

import com.proyectodawii.Proyect_dawii_backend.dto.CrearVueloRequest;
import com.proyectodawii.Proyect_dawii_backend.dto.VueloDTO;
import com.proyectodawii.Proyect_dawii_backend.model.Vuelo;
import com.proyectodawii.Proyect_dawii_backend.service.VueloService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/vuelos")
@RequiredArgsConstructor           // inyección por constructor, evita @Autowired
public class VueloController {

    private final VueloService vueloService;

    /* ---------- helper interno ---------- */
    private VueloDTO toDto(Vuelo v) {
        return new VueloDTO(
                v.getId(), v.getNumeroVuelo(), v.getAerolinea(),
                v.getOrigen(), v.getDestino(),
                v.getHoraSalida(), v.getHoraLlegada(), v.getEstado()
        );
    }

    /* ============ ENDPOINTS PÚBLICOS (sin rol) ============ */

    /** Listar / buscar (acceso libre) */
    @GetMapping
    public List<VueloDTO> listar(
            @RequestParam(defaultValue = "") String origen,
            @RequestParam(defaultValue = "") String destino) {

        return vueloService.buscarVuelosPorOrigenYDestino(origen, destino)
                .stream().map(this::toDto).toList();
    }

    /** Detalle de un vuelo (acceso libre) */
    @GetMapping("/{id}")
    public ResponseEntity<VueloDTO> detalle(@PathVariable Long id) {
        return vueloService.obtenerVueloPorId(id)
                .map(this::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /* ============ ENDPOINTS SOLO ADMIN ============ */

    /** Crear vuelo – solo ADMIN */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<VueloDTO> crear(@Validated @RequestBody CrearVueloRequest req) {
        Vuelo creado = vueloService.crearVuelo(req);
        return ResponseEntity
                .created(URI.create("/api/vuelos/" + creado.getId()))
                .body(toDto(creado));
    }

    /** Actualizar vuelo – solo ADMIN */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public VueloDTO actualizar(@PathVariable Long id,
                               @Validated @RequestBody VueloDTO dto) {
        return toDto(vueloService.actualizarVuelo(id, dto));
    }

    /** Eliminar vuelo – solo ADMIN */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        vueloService.eliminarVuelo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/prueba")
    public ResponseEntity<?> prueba() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("prueba");
    }
}
