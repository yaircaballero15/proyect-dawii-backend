package com.proyectodawii.Proyect_dawii_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder        //  ← agrega esta línea
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {
    public String correo;
    public String clave;
}
