package com.proyectodawii.Proyect_dawii_backend.repository;

import com.proyectodawii.Proyect_dawii_backend.model.Boleto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IBoletoRepository extends JpaRepository<Boleto, Long> {
    //List<Boleto> findByUsuarioId(Long usuarioId);
    //List<Boleto> findByVueloId(Long vueloId);

    List<Boleto> findByUsuarioCodUsua(Long codUsua); // ← corregido
    List<Boleto> findByVueloId(Long vueloId);         // ← correcto

}