package com.proyectodawii.Proyect_dawii_backend.service;

import com.proyectodawii.Proyect_dawii_backend.dto.CrearVueloRequest;
import com.proyectodawii.Proyect_dawii_backend.dto.VueloDTO;
import com.proyectodawii.Proyect_dawii_backend.model.Vuelo;
import com.proyectodawii.Proyect_dawii_backend.repository.IVueloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VueloService {

    @Autowired
    private IVueloRepository vueloRepository;

    public List<Vuelo> obtenerTodosLosVuelos() {
        return vueloRepository.findAll();
    }

    public Optional<Vuelo> obtenerVueloPorId(Long id) {
        return vueloRepository.findById(id);
    }

    public Vuelo crearVuelo(CrearVueloRequest request) {
        Vuelo nuevoVuelo = new Vuelo();
        nuevoVuelo.setNumeroVuelo(request.getNumeroVuelo());
        nuevoVuelo.setAerolinea(request.getAerolinea());
        nuevoVuelo.setOrigen(request.getOrigen());
        nuevoVuelo.setDestino(request.getDestino());
        nuevoVuelo.setHoraSalida(request.getHoraSalida());
        nuevoVuelo.setHoraLlegada(request.getHoraLlegada());
        nuevoVuelo.setEstado(request.getEstado() != null ? request.getEstado() : "Programado"); // Default
        return vueloRepository.save(nuevoVuelo);
    }

    public Vuelo actualizarVuelo(Long id, VueloDTO vueloActualizado) {
        return vueloRepository.findById(id)
                .map(vuelo -> {
                    vuelo.setNumeroVuelo(vueloActualizado.getNumeroVuelo());
                    vuelo.setAerolinea(vueloActualizado.getAerolinea());
                    vuelo.setOrigen(vueloActualizado.getOrigen());
                    vuelo.setDestino(vueloActualizado.getDestino());
                    vuelo.setHoraSalida(vueloActualizado.getHoraSalida());
                    vuelo.setHoraLlegada(vueloActualizado.getHoraLlegada());
                    vuelo.setEstado(vueloActualizado.getEstado());
                    return vueloRepository.save(vuelo);
                })
                .orElseThrow(() -> new RuntimeException("Vuelo no encontrado con ID: " + id)); // Manejo de errores
    }

    public void eliminarVuelo(Long id) {
        vueloRepository.deleteById(id);
    }

    // Métodos de búsqueda personalizados
    public List<Vuelo> buscarVuelosPorOrigenYDestino(String origen, String destino) {
        return vueloRepository.findByOrigenAndDestino(origen, destino);
    }
}