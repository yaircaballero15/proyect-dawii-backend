package com.proyectodawii.Proyect_dawii_backend.dto;

import lombok.Data;

import java.util.Date;
@Data
public class UserDto {
    private Long codUsua;
    private String nomUsua;
    private String apeUsua;
    private String correo;
    private Date fnaUsua;
    private String rolUsua;
    private String estUsua;
}
