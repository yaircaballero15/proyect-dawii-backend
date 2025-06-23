// src/main/java/com/proyectodawii/Proyect_dawii_backend/dto/CrearVueloRequest.java
package com.proyectodawii.Proyect_dawii_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO que envía el cliente (ADMIN) al crear un vuelo.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrearVueloRequest {


    private String numeroVuelo;

    private String aerolinea;


    private String origen;

    private String destino;
    private LocalDateTime horaSalida;
    private LocalDateTime horaLlegada;

    /** Opcional; si viene null, el servicio lo establecerá a "Programado". */
    private String estado;
}
