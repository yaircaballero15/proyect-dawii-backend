package com.proyectodawii.Proyect_dawii_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDTO {
  private String token;
  private Long codUsua;
  private String nomUsua;
  private String apeUsua;
  private String correo;
  private String rolUsua;
}