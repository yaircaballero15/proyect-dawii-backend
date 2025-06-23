package com.proyectodawii.Proyect_dawii_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_boleto")
@Data
@NoArgsConstructor
public class Boleto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ---------- FK → Usuario.cod_usua ---------- */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "cod_usua",                 // columna FK en tb_boleto
            referencedColumnName = "cod_usua", // PK en tb_usuarios
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_boleto_usuario")
    )
    private Usuario usuario;

    /* ---------- FK → Vuelo.id ---------- */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "vuelo_id",                 // columna FK en tb_boleto
            referencedColumnName = "id",       // PK en vuelos
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_boleto_vuelo")
    )
    private Vuelo vuelo;

    @Column(nullable = false)
    private LocalDateTime fechaCompra;

    @Column(nullable = false, length = 5)
    private String asiento;

    @Column(nullable = false)
    private BigDecimal precio;
}
