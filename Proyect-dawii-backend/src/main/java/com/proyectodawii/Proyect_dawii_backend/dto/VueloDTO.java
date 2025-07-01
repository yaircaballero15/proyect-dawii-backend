package com.proyectodawii.Proyect_dawii_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@Builder        //  ← agrega esta línea
@AllArgsConstructor
@NoArgsConstructor
public class   VueloDTO {
    private Long id;

    private String numeroVuelo;
    private String aerolinea;
    private String origen;
    private String destino;
    private LocalDateTime horaSalida;
    private LocalDateTime horaLlegada;
    private String estado;   // Programado / Retrasado / Cancelado, etc.
}