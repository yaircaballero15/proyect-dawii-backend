package com.proyectodawii.Proyect_dawii_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@Builder        //  ← agrega esta línea
@AllArgsConstructor
@NoArgsConstructor
public class RegistroUsuarioDTO {
    public String nom_usua;
    public String ape_usua;
    public String correo;
    public String clave;
    public Date fna_usua;
}