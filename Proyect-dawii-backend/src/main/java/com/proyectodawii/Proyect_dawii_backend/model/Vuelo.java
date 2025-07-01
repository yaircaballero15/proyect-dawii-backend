package com.proyectodawii.Proyect_dawii_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_vuelos")
@Data
@NoArgsConstructor
public class Vuelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                       // PK «id»

    private String numeroVuelo;
    private String aerolinea;
    private String origen;
    private String destino;
    private LocalDateTime horaSalida;
    private LocalDateTime horaLlegada;
    private String estado;                // Programado / Retrasado / etc.

    /* ---------- Relación inversa ---------- */
    @OneToMany(mappedBy = "vuelo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Boleto> boletos;
}
