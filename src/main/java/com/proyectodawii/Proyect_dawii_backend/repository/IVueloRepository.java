package com.proyectodawii.Proyect_dawii_backend.repository;

import com.proyectodawii.Proyect_dawii_backend.model.Vuelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface IVueloRepository extends JpaRepository<Vuelo, Long> {

    Optional<Vuelo> findByNumeroVuelo(String numeroVuelo);
    List<Vuelo> findByOrigenAndDestino(String origen, String destino);
    List<Vuelo> findByAerolinea(String aerolinea);
}
