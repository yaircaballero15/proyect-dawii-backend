package com.proyectodawii.Proyect_dawii_backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "tb_usuarios")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_usua")   // la columna sigue llamándose igual
    private Long codUsua;        // ← ahora es wrapper y camelCase
    @Column(length = 15, nullable = false)
    private String nomUsua;
    @Column(length = 25, nullable = false)
    private String apeUsua;
    @Column(name = "usr_usua", length = 45,
            nullable = false, unique = true)
    private String correo;
    @Column(name = "cla_usua", length = 100,
            nullable = false)
    private String clave;
    @Temporal(TemporalType.DATE)
    private Date fna_usua;
    private String rolUsua  ;
    private String estUsua ;
}
